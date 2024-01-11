"use client"

import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from '@hookform/resolvers/zod'
import { UserValidation } from '@/lib/validations/user'
import * as z from 'zod'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { isBase64Image } from '@/lib/utils'
import { useUploadThing } from '@/lib/uploadthing'


interface Props {
  user: {
    id: string,
    objectId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
  },
  btnTitle: string,
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || '',
      name: user?.name || '',
      username: user?.username || '',
      bio: user?.bio || '',
    },
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files))

      if(!file.type.includes('image')) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || '';

        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file);
    }
  }

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files)

      if(imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    // UPDATE USER PROFILE HERE
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col justify-start gap-10"
    >
        {/* image upload */}
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='flex h-24 w-24 itemse-center justify-center rounded-full bg-gray-800'>
                {field?.value ? (
                  <Image   
                    src={field.value}
                    alt='profile photo'
                    width={96}
                    height={96}
                    priority
                    className='rounded-full object-contain'
                  />
                ) : (
                  <Image   
                    src="/assets/image.svg"
                    alt='profile photo'
                    width={24}
                    height={24}
                    className='object-contain'
                  />
                )}
              </FormLabel>
              <FormControl className='flex-1 font-light text-gray-200'>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Upload a photo'
                  className='cursor-pointer border-none bg-transparent outline-none file:text-blue-400'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-2 w-full'>
              <FormLabel className='text-gray-200 font-semibold'>
                Name
              </FormLabel>
              <FormControl className='flex-1 font-light text-white'>
                <Input
                  type='text'
                  className='border-none p-3 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-gray-800 font-normal'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-2 w-full'>
              <FormLabel className='text-gray-200 font-semibold'>
                Username
              </FormLabel>
              <FormControl className='flex-1 font-light text-white'>
                <Input
                  type='text'
                  className='border-none p-3 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-gray-800 font-normal'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-2 w-full'>
              <FormLabel className='text-gray-200 font-semibold'>
                Bio
              </FormLabel>
              <FormControl className='flex-1 font-light text-white'>
                <Textarea
                rows={8}
                  className='border-none p-3 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-gray-800 font-normal'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className='bg-violet-500 hover:bg-violet-600 transition-colors font-semibold'>Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProfile