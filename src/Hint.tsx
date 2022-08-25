import githubLogo from "./assets/app_github.svg";
import googleStoreLogo from "./assets/app_google_store.svg";
import connectLogo from "./assets/connect.svg";
import React from "react";
import './styles.scss';


export const Hint = ({ hint }: { hint: 'download extension' | 'connect wallet' }) => {

    if (hint === 'download extension') {
        return (
            <div className='hint'>
                <p className="text">
                    Please install the new version of extension from the Chrome web store
                </p>
                <a
                    className="store__link"
                    href="https://chrome.google.com/webstore/detail/pontem-wallet/phkbamefinggmakgklpkljjmgibohnba"
                    target="_blank"
                >
                    <img src={githubLogo} alt="Chrome web store link"/>
                </a>
                <div className="divider"/>
                <p className=" text">
                    For latest devnet release please download extension from Github and
                    install it manually
                </p>
                <a
                    className="image-link"
                    href="https://github.com/pontem-network/pontem-wallet/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={googleStoreLogo} alt="Github app link"/>
                </a>
                <div className="divider"></div>
                <p className="help text-center mt-4">
                    Check out the&nbsp;
                    <a
                        className="link"
                        href="https://chrome.google.com/webstore/detail/pontem-wallet/phkbamefinggmakgklpkljjmgibohnba"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Chrome Store</a
                    >
                    &nbsp;or our&nbsp;
                    <a
                        className="link"
                        href="https://github.com/pontem-network/pontem-wallet/releases"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Github</a
                    >
                    &nbsp;for updates.
                </p>
            </div>
        )
    }

    if (hint === 'connect wallet') {
        return (
            <div className='hint'>
                <img src={connectLogo} alt=""/>
                <p className="mb-4">
                    To continue working with the site, you need to connect the wallet and
                    allow the site access to the account
                </p>
            </div>
        )
    }

    return null;
}