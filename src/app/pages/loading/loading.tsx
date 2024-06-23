import * as AllExports from "../index";
import './loading.css'
export const Loading = () => {
    return (
        <div className="loading">
            <img className="Thanos-Gif" src={AllExports.Thanos_Snap} />
            <h2>Loading</h2>
        </div>
    )
}