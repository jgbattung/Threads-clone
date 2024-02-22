"use client"

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { usePathname, useRouter } from "next/navigation";
import { Input } from '../ui/input';
import { ReplyValidation } from '@/lib/validations/thread';
import { Button } from '../ui/button';
import Image from "next/image";
import { Textarea } from '../ui/textarea';
import { addReplyToThread } from '@/lib/actions/thread.actions';
import { useLoadingStore } from '@/lib/store';

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Reply = ({
  threadId,
  currentUserImg,
  currentUserId
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useLoadingStore();
  
  const form = useForm<z.infer<typeof ReplyValidation>>({
    resolver: zodResolver(ReplyValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ReplyValidation>) => {
    setIsLoading(true);
    await addReplyToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname,
    );

    form.reset();
    setIsLoading(false);
  }
  
  return (
    <div>
      <Form {...form}>
        <form 
          className="mt-10 flex items-center gap-4 border-y-gray-900 py-5 max-sm:flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className='flex gap-2 w-full items-center'>
                <FormLabel>
                  <Image
                    src={currentUserImg}
                    alt="Profile photo"
                    width={48}
                    height={48}
                    className='rounded-full object-cover max-h-12 max-w-12'
                  />
                </FormLabel>
                <FormControl className='border-none bg-transparent'>
                  <Textarea
                    // type='text'
                    maxLength={250}
                    placeholder='Reply to this thread...'
                    className='border-none overflow-hidden resize-none text-gray-200 font-light text-sm p-4 bg-gray-950 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit" 
            className='rounded-3xl px-8 py-2 bg-violet-500 font-light text-sm hover:bg-violet-600 transition-colors max-sm:w-full'
            disabled={isLoading}
          >
            Reply
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Reply