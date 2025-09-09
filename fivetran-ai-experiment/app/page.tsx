import ChatThreadWrapper from '@/components/Chat/ChatThreadWrapper';

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-80 bg-gray-05"></div>
      <div className="flex flex-row gap-9 px-8 py-6 justify-center">
        <div className="size-80 bg-white border border-gray-10 rounded-lg" />
        <div className="size-80 bg-white border border-gray-10 rounded-lg" />
        <div className="size-80 bg-white border border-gray-10 rounded-lg" />
      </div>
      <ChatThreadWrapper />
    </div>
  );
}
