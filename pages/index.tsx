import { useState, useRef, MouseEvent, useCallback } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import {
  Stack,
  RadioGroup,
  Radio,
  HStack,
  Flex,
  Box,
  Text,
  Button,
  Image,
  Alert,
  AlertIcon,
  useToast
} from '@chakra-ui/react'
import Layout from '../components/Layout'

import { useDropzone } from 'react-dropzone'

import axios from 'axios'

const Home = (props: {}) => {
  const [initialFn, setInitialFn] = useState<any>(null)
  const [initialImgSize, setInitialImgSize] = useState<any>(null)
  const [compressedImgSize, setCompressedImgSize] = useState<any>(null)
  const [initialImg, setInitialImg] = useState<any>(null)
  const [compressedImg, setCompressedImg] = useState<any>(null)
  const [percentOfOriginalImg, setPercentOfOriginalImg] = useState<any>(50)
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false)

  const downloadBtn = useRef<null | HTMLAnchorElement>(null)
  const hiddenImg = useRef<null | HTMLImageElement>(null)

  const toast = useToast()

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles.length > 1) {
      toast({
        title: 'Please only upload 1 file.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      return
    }

    const imgFile = acceptedFiles[0]
    setInitialFn(imgFile.name)

    if (!['jpg', 'jpeg', 'png'].includes(imgFile.name.toLowerCase().split('.')[1])) {
      toast({
        title: 'Only .jpg, .jpeg, and .png images are accepted.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      try {
        setInitialImg(reader.result)
        localStorage.setItem('image-to-compress', reader.result as string)

        // Get initial img size
        const bufferLen = (reader.result as any).length
        const sizeInBytes = 4 * Math.ceil((bufferLen / 3)) * 0.5624896334383812
        const sizeInKb = sizeInBytes / 1000
        setInitialImgSize(sizeInKb)
      } catch (err) {
        toast({
          title: 'File size cannot exceed 5MB.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        })
        return
      }
    }

    reader.readAsDataURL(imgFile)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleCompressImgs = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setDisabledBtn(true)

    const storedImg: string | null = localStorage.getItem('image-to-compress')

    const { width: currImgWidth, height: currImgHeight } = hiddenImg.current || {}

    try {
      const compressedImg = await axios.post(
        '/api/compress-image',
        {
          currImgWidth,
          storedImg,
          percentOfOriginalImg,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      setCompressedImg(compressedImg.data)

      // Get compressed img size
      const bufferLen = (compressedImg.data as any).length
      const sizeInBytes = 4 * Math.ceil((bufferLen / 3)) * 0.5624896334383812
      const sizeInKb = sizeInBytes / 1000
      setCompressedImgSize(sizeInKb)

      localStorage.removeItem('image-to-compress')

      setDisabledBtn(false)
    } catch (err) {
      console.log('Error')
    }
  }

  const clearInputFiles = (event: MouseEvent<HTMLElement>) => {
    (event.target as HTMLInputElement).value = ""
    setInitialImgSize(null)
    setCompressedImg(null)
    setCompressedImgSize(null)
    setPercentOfOriginalImg(50)
  }

  return (
    <div>
      <Head>
        <title>Home | MinImage</title>
      </Head>
      <Layout>
        <Flex justify="center">
          <Box w="container.md">
            <Flex
              {...getRootProps()}
              mb={8}
              border="2px dashed"
              borderColor="gray.400"
              p={4} borderRadius="10px"
              color="gray.400"
              onClick={(event) => {
                clearInputFiles(event)
                getRootProps().onClick(event)
              }}
              bg={isDragActive ? 'gray.200' : 'white.500'}
            >
              {/* <input type="file" onChange={selectImgsToCompress} /> */}
              <input {...getInputProps()} />
              <Text>{`Drag 'n' drop your file here, or click to select file (max. 1 file)`}</Text>
            </Flex>
            {initialImgSize &&
              <Box mb={8}>
                <Box mb={8}>
                  <Text>{`Initial Image Size: ${Math.trunc(initialImgSize)} kB`}</Text>
                  {compressedImgSize && <Text>{`Compressed Image Size: ${Math.trunc(compressedImgSize)} kB`}</Text>}
                </Box>
                <Box>
                  <Text mb={4}>{`% of original:`}</Text>
                  <RadioGroup onChange={setPercentOfOriginalImg} value={parseInt(percentOfOriginalImg)}>
                    <Stack direction='column'>
                      {[25, 50, 75].map((percentage, i) => {
                        return (
                          <Radio
                            key={i}
                            value={percentage}
                            isDisabled={disabledBtn || compressedImg}>
                            ~{percentage}%
                          </Radio>
                        )
                      })}
                    </Stack>
                  </RadioGroup>
                </Box>
                <HStack spacing={2} my={8}>
                  <Button colorScheme="primary" isLoading={disabledBtn} disabled={!initialImg || compressedImg} onClick={handleCompressImgs}>Compress</Button>
                  <Button colorScheme="primary" disabled={disabledBtn || !initialImg} onClick={() => window.location.reload()}>Reset</Button>
                </HStack>
              </Box>
            }
            {initialImg && <Image display="none" src={initialImg} alt="hidden-image" ref={hiddenImg} />}
            {compressedImg &&
              <>
                <Alert status='success' mb={8}>
                  <AlertIcon />
                  Compression successful!
                </Alert>
                <Box>
                  <Button colorScheme="primary" onClick={() => downloadBtn.current?.click()}>{`Download Compressed Image`}</Button>
                  <a
                    download={`${initialFn.split('.')[0]}-minimage-compressed.${initialFn.split('.')[1]}`}
                    href={compressedImg}
                    style={{ display: 'none' }}
                    ref={downloadBtn}
                  />
                </Box>
                {/* <Image src={compressedImg} alt="display-image" /> */}
              </>
            }
          </Box>
        </Flex>
      </Layout>
    </div >
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  return {
    props: {
    },

    revalidate: 60,
  }
}

export default Home
