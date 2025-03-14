import React from 'react'
import Greeting from '@/components/Greeting'
import DrawerDialogDemo from '@/components/SlipUploadUI'
import SlipUpload from '@/components/SlipUpload'
import { Play } from 'lucide-react'
const page = () => {
  return (
    <div>

      {/* comment */}
      <Greeting />
      <DrawerDialogDemo />
      <a href="https://test1omi.vercel.app/game_room" className='absolute text-white bottom-[5vh] right-[5vw] '> <Play /></a>

    </div>
  )
}

export default page