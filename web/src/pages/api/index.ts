import { getAccessToken } from '@auth0/nextjs-auth0'
import httpProxyMiddleware from 'next-http-proxy-middleware';
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = await getAccessToken(req, res);

  return httpProxyMiddleware(req, res, {
    target: 'http://localhost:3332/graphql',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}