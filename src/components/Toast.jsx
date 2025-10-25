import React, { useState, useEffect } from 'react'
let queue = []
export function pushToast(msg, type='info'){
  queue.push({msg,type})
  window.dispatchEvent(new Event('toast-push'))
}
export default function Toast(){
  const [toasts, setToasts] = useState([])
  useEffect(()=> {
    const onPush = ()=> {
      setToasts([...queue])
      setTimeout(()=> { queue.shift(); setToasts([...queue]) }, 3000)
    }
    window.addEventListener('toast-push', onPush)
    return ()=> window.removeEventListener('toast-push', onPush)
  },[])
  if (!toasts.length) return null
  return (<div className="toast-container">
    {toasts.map((t,i)=><div key={i} className={'toast '+t.type}>{t.msg}</div>)}
  </div>)
}
