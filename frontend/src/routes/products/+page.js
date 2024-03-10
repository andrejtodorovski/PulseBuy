import { interceptedFetch } from "../../helpers/helpers"

export async function load({ fetch, params }) {
    const res = await interceptedFetch('http://localhost:3000/product/', {})
    const products = await res.json()
    if (res.ok) {
      return {
          products: products
      }
    }

    return {
      status: res.status,
      error: new Error('Could not fetch the products.')
    }
  }