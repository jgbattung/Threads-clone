"use client"

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { usePathname, useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThreadValidation } from '@/lib/validations/thread'
import { createThread } from '@/lib/actions/thread.actions'
import path from 'path'
import { useLoadingStore } from '@/lib/store'

// import { UserValidation } from '@/lib/validations/user'
// import { updateUser } from '@/lib/actions/user.actions'


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

function PostThread({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useLoadingStore();
  
  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    setIsLoading(true);
    await createThread({
      text: values.thread,
      author: userId,
      path: pathname,
    });
    router.push("/");
    setIsLoading(false);
  }

  return (
    <div>
      <Form {...form}>
        <form 
          className="flex flex-col justify-start gap-3 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2 w-full'>
                <FormLabel className='text-gray-200 font-semibold'>
                  Thread
                </FormLabel>
                <FormControl className='flex-1 font-light text-white'>
                  <Textarea
                    rows={8}
                    placeholder="Got something to say?"
                    className='border-none text-white font-light text-sm p-4 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-gray-900'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit"
            className="bg-violet-500 hover:bg-violet-600 transition-colors"
            disabled={isLoading}
          >
            Post Thread
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default PostThread