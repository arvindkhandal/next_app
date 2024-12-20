import Image from 'next/image'
import EditForm from '@/components/EditForm'
import Menu from '@/components/Menu'
import MenuTree from '@/components/MenuTree'
import folder from '../../public/folder.svg'
import titleIcon from '../../public/title-icon.svg'
import downArrow from '../../public/down-arrow.svg'
import Collapse from '@/components/Collapse'

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/menu')
  const { rootNode } = await res.json()
  // console.log(rootNode)

  return (
    <>
      <section className='flex flex-col lg:flex-row outter-padding gap-8 h-[100vh]'>
        {/* menu bar */}
        <Menu />

        {/* main */}
        <div className='text-xs outter-padding flex flex-col gap-8 w-full overflow-y-auto'>
          <div className='flex gap-2 items-center'>
            <Image
              src={folder}
              alt='folder'
            />
            <span className='text-gray-4'>/</span>
            <p>Menus</p>
          </div>
          <h1 className='hidden lg:flex gap-4 items-center text-3xl font-bold'>
            <Image
              src={titleIcon}
              alt='title-icon'
            />
            <p>Menus</p>
          </h1>
          <div>
            <p className='text-gray-1'>Menu</p>
            <div className='w-fit mt-3 lg:mt-2 items-center flex gap-20 justify-between rounded-corner inner-padding py-2 px-6 sm:px-8 bg-gray-3'>
              <p>system management</p>
              <Image
                src={downArrow}
                alt='down-icon'
              />
            </div>
          </div>

          <div className='flex flex-col lg:flex-row gap-10 text-sm'>
            <div className='flex flex-col gap-6 lg:gap-4 w-full'>
              <Collapse />
              {/* Menu tree */}
              <ul>
                <MenuTree node={rootNode} />
              </ul>
            </div>

            {/* update */}
            <EditForm />
          </div>
        </div>
      </section>
    </>
  )
}
