
import React from "react"


class Logout extends React.Component {

    render() {
        return (
            <div>
                {localStorage.clear()}
                {this.props.history.push('/')}

            </div>


        );
    }

}
export default Logout;