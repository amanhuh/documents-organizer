

export default function Post(props) {
  return (
    <div className="w-80 cursor-pointer group">
      <div className="h-24 p-5 rounded-t-xl bg-yellow-300 dark:bg-yellow-400 border-t border-x border-neutral-500/50 group-hover:border-neutral-400/50 dark:group-hover:border-neutral-600/50">
        <p className="font-inter text-2xl font-bold text-white drop-shadow-lg">{props.title}</p>
      </div>
      <div className="h-48 p-4 rounded-b-xl border-b border-x bg-neutral-200/30 dark:bg-neutral-800 border-neutral-500/50 group-hover:border-neutral-400/50 dark:group-hover:border-neutral-600/50 shadow group-hover:shadow-xl group-hover:dark:shadow-neutral-700/20">
        { /* <div className="h-full flex">
          <p className="mt-auto font-inter text-lg text-neutral-700 dark:text-neutral-300">4 posts</p>
        </div> */ }
      </div>
    </div>
  )
} 