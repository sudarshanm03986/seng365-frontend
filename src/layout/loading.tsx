const Loading = () => {
    return ( <div className="h-full w-full flex items-center gap-2 justify-center"> <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-link"
        role="status">
        <span
          className="!absolute text-link !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
      </div> 
      <p className="text-link font-semibold">Loading ... </p>
      
      </div>);
}
 
export default Loading;