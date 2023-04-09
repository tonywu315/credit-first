import { useParams } from "react-router-dom"
import { Buffer } from "buffer"

export function Recommend() {
  let params = useParams();
  const userData = JSON.parse(Buffer.from(params.userData, "base64").toString())

  return (
    <div>
      { userData }
    </div>
  )
}