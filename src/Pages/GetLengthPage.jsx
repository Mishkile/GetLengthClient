import axios from "axios"
import { useState } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function GetLengthPage() {
    const [folderID, setFolderID] = useState("")
    const [length, setLength] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const getData = async () => {
        setIsLoading(true)
        if (folderID.length < 6) {
           setError("Please enter a folder ID")
            setIsLoading(false)
            return
        }
        setError(false)
        try {
        const response = await axios.post("https://rich-ruby-bream-ring.cyclic.app/", { folderID })
        console.log(response)

       
            switch(response.status) {
                case 200:
                    if(response.data.time === "") {
                        setError("Error: No Videos Found")
                        setIsLoading(false)
                        return
                    }
                    setIsLoading(false)
                    console.log(response.data)
                    setLength(response.data)
                    break
                case 400:
                    setIsLoading(false)
                    setError("Error: Invalid Folder ID")
                    break
                case 404:
                    setIsLoading(false)
                    setError("Error: Folder not found")
                    break
                case 500:
                    setIsLoading(false)
                    setError("Error: Internal Server Error")
                    break
                default:
                    setIsLoading(false)
                    setError("Error: Unknown Error")
                    break
            } 
        } catch(e) {
            setIsLoading(false)
            setError("Error: Unknown Error")
            
        }

       

        
    }
    return (
        <div>


            <input onChange={(e) => setFolderID(e.target.value)} placeholder="Enter Folder ID" />
            <br />
            {error ? <div style={{ color: "red" }}>Error: {error}</div> : null}
            <button onClick={getData}>Get Length!</button> <br />

            <div>

            </div>



            {isLoading ? <div><Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
            </div> : null}




            {length === "" || error ? null : <div>

                Total Length is: <br />
                Hours: {length[0]} <br />
                Minutes: {length[1]} <br />
                Seconds: {length[2]} <br />
            </div>}


        </div>
    )
}
export default GetLengthPage