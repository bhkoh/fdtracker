import React from "react";
import Auth from "Auth";

export const LandingPage = props => {
    return (
        <div>
            <h1>
                Landing Page
            </h1>
            <button
                onClick = {() => {
                    Auth.login(() => {
                        props.history.push("/admin/dashboard");
                    })
                }}
            >

                Login
            </button>
        </div>
    )
}