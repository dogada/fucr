import { create, IPFSHTTPClient } from 'ipfs-http-client'

export async function initIpfs(): Promise<IPFSHTTPClient> {
  const url = new URL(process.env.NEXT_PUBLIC_IPFS_ENDPOINT as string)
  try {
    return create({
      host: url.host,
      port: parseInt(url.port),
      protocol: url.protocol,
      headers: {
        authorization: process.env.NEXT_PUBLIC_IPFS_AUTH as string
      }
    })
  } catch (e) {
    console.error('initIpfs', e)
    throw e
  }
}
