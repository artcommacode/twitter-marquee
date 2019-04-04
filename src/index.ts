import * as Twitter from 'twitter'
import * as dotenv from 'dotenv'

dotenv.config()

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

if (
  !process.env.CONSUMER_KEY ||
  !process.env.CONSUMER_SECRET ||
  !process.env.ACCESS_TOKEN_KEY ||
  !process.env.ACCESS_TOKEN_SECRET
) {
  throw new Error('Must set all environment varialbles')
}

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

const title = `I thought what I'd do was, I'd pretend to be one of those deaf-mutes. `

const makeName = async (index: number) => {
  const name = title
    .slice(index)
    .concat(title)
    .slice(0, 50)
  try {
    await client.post('account/update_profile', {name})
    console.log(name)
  } catch (error) {
    console.log(error)
  }
  await sleep(10 * 60 * 1000)
  makeName((index + 1) % 50)
}

makeName(0)
