import Head from "next/head";
import { CalendarIcon } from "@heroicons/react/solid";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { GetStaticProps } from "next";
import { withPublicApollo } from "../lib/withPublicApollo";
import { getServerPageGetProducts, ssrGetProducts } from "../graphql/generated/pagePublic";
import { GetProductsQuery, useCreatePurchaseMutation } from "../graphql/generated/graphql";
import { withApollo } from "../lib/withApollo";

interface EnrollProps {
  data: GetProductsQuery;
}

function Enroll({ data }: EnrollProps) {
  const [createPurchase] = useCreatePurchaseMutation()

  async function handlePurchaseProduct(productId: string) {
    await createPurchase({
      variables: {
        productId,
      }
    })

    alert('Compra realizada com sucesso!');
  }

  return (
    <>
      <Head>
        <title>Realizar matrícula</title>
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
      </Head>

      <div className="bg-white">
        <div className="relative overflow-hidden bg-gray-50">
          <Header />
          <main className="py-20 max-w-7xl mx-auto ">
            <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
              <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">Comece a estudar</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Realizar matrícula
              </p>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md mt-8">
              <ul role="list" className="divide-y divide-gray-200">
                {data.products.map((product) => (
                  <li key={product.id}>
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex text-sm">
                            <p className="font-medium text-indigo-600 truncate">{product.title}</p>
                            <p className="ml-1 flex-shrink-0 font-normal text-gray-500">em Programação</p>
                          </div>
                        </div>
                      </div>
                      <div className="ml-5 flex-shrink-0">
                        <button onClick={() => handlePurchaseProduct(product.id)} className="px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700">
                          Realizar inscrição
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({  }) => {
  const data = await getServerPageGetProducts(undefined, {} as any)

  return {
    props: data.props,
    revalidate: 60 * 60, // 1 hour
  }
}

export default withApollo(
  ssrGetProducts.withPage()(Enroll)
)