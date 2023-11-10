import React from "react"

const ChatBox = ({
  fetchAgain,
  setFetchAgain,
}: {
  fetchAgain: boolean
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return <>ChatBox {fetchAgain} {setFetchAgain(true)}</>
}

export default ChatBox
