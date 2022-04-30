import type { NextApiRequest, NextApiResponse } from 'next'

import sharp from 'sharp'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
}

const calculateWidth = (currImgWidth: number, percentOfOriginalImg: number) => {
  const compressedImgWidth = currImgWidth * Math.sqrt(percentOfOriginalImg / 100)

  return Math.round(compressedImgWidth)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { currImgWidth, storedImg, percentOfOriginalImg } = req.body

    try {
      const processedStoredImg = storedImg.split(';base64,').pop()

      const imgBuffer = await sharp(Buffer.from(processedStoredImg, 'base64'))
        .resize({
          width: calculateWidth(currImgWidth, percentOfOriginalImg),
        })
        .toFormat("jpeg", { mozjpeg: true })
        .toBuffer()

      const base64Image = `data:image/jpeg;base64,${imgBuffer.toString('base64')}`

      return res.status(200).send(base64Image)
    } catch (err) {
      console.log(err)
    }
  }
}