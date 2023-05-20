import axios from "axios"
import { useState } from "react"
function GetLengthPage() {
    const [folderID, setFolderID] = useState("")
    const [length, setLength] = useState("")
    const getData = async () => {
        const { data } = await axios.post("https://rich-ruby-bream-ring.cyclic.app/", { folderID })
        setLength(data.time)
    }
    return (
        <div>


            <input onChange={(e) => setFolderID(e.target.value)} placeholder="Enter Folder ID" />
            <br />
            <button onClick={getData}>Get Length!</button> <br />

            Total Length is: <br />
            Hours: {length[0]} <br />
            Minutes: {length[1]} <br />
            Seconds: {length[2]} <br />
        </div>
    )
}
export default GetLengthPage