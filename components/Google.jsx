import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import GoogleColor from '../assets/GoogleColor.png'

import Styles from '../styles/Home.module.css'

import GoogleLeaf from '../assets/GoogleLeaf.png'

const navbar_links_left = [ { 
    "link" : "https://about.google/?fg=1&utm_source=google-US&utm_medium=referral&utm_campaign=hp-header", 
    "text" : "About"
 }, 
 { 
    "link" : "https://store.google.com/US?utm_source=hp_header&utm_medium=google_ooo&utm_campaign=GS100042&hl=en-US", 
    "text" : "Store"
 }, 
]

const navbar_links_right = [ { 
    "link" : "https://mail.google.com/mail/&ogbl",
    "text" : "Gmail"
 }, 
 { 
    "link" : "https://www.google.com/imghp?hl=en&ogbl", 
    "text" : "Images"
 }
]

const footer_links_left = [ {
    "link" : "https://www.google.com/intl/en_us/ads/?subid=ww-ww-et-g-awa-a-g_hpafoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpafooter&fg=1",
    "text" : "Advertising"
},
{
    "link" : "https://www.google.com/services/?subid=ww-ww-et-g-awa-a-g_hpbfoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpbfooter&fg=1",
    "text" : "Business"
},
{
    "link" : "https://google.com/search/howsearchworks/?fg=1",
    "text" : "How Search works"
},
]

const footer_links_center = [ { 
    "link" : "https://sustainability.google/carbon-free/?utm_source=googlehpfooter&utm_medium=housepromos&utm_campaign=bottom-footer&utm_content=#home",
    "text" : <Image src = {GoogleLeaf} alt = "Google Leaf" width = "20px" height = "5px" />
    },
    { 
    "link" : "https://sustainability.google/carbon-free/?utm_source=googlehpfooter&utm_medium=housepromos&utm_campaign=bottom-footer&utm_content=#home",
    "text" : "Carbon neutral since 2007"
    },
]

const footer_links_right = [ {
    "link" : "https://www.google.com/intl/en/policies/privacy/?fg=1",
    "text" : "Privacy"
},
{
    "link" : "https://www.google.com/intl/en/policies/terms/?fg=1",
    "text" : "Terms"
},
{
    "link" : "https://www.google.com/preferences?hl=en",
    "text" : "Settings"
}]

const Google = () => {
  return (
    <div className = "h-screen w-screen" id = "container">
        <div className = "flex justify-between items-center h-[60px] p-[6px]" id = "navbar">
            <div className = "flex" id = "navbar-left"> 
                {    
                    navbar_links_left.map((item, index) => (
                        <div className = {index == 0 ? "ml-[15px] px-[5px] m-[5px] hover:underline" : "m-[5px] px-[5px] hover:underline"} key = {index}> 
                            <Link href = {item.link} className = "text-[#202124]">
                                {item.text}
                            </Link> 
                        </div> 
                    ))
                }
            </div>   
            <div className = "flex mr-[15px]" id = "navbar-right"> 
                {    
                    navbar_links_right.map((item, index) => (
                        <div className = "py-[3px] px-[5px] m-[5px] text-[13px] hover:underline" key = {index}> 
                            <Link href = {item.link} className = "text-[#202124]">
                                {item.text}
                            </Link> 
                        </div> 
                    ))
                }
                 <Link href = "https://accounts.google.com/ServiceLogin?hl=en&passive=true&continue=https://www.google.com/&ec=GAZAmgQ"> 
                    <button className = "ml-[15px] bg-[#1a73e8] h-[36px] w-[96px] rounded-[4px] px-[10px] hover:bg-[#135CBC] text-[#FFFFFF]">
                        Sign in 
                    </button> 
                </Link>
            </div> 
        </div> 
        <div className = {`min-h-[150px] max-h-[290px] flex flex-col ${Styles.height}`}> 
        <div className = "flex justify-center mt-auto" id = "google-logo"> 
            <Image src = {GoogleColor}
                alt = 'Google Logo'
                width = {272}
                height = {92}
            /> 
        </div> 
        </div> 
        <div className = "p-[20px] max-h-[160px]" id = "search-bar">
            <form action = "/send-data-here" method = "post" className = "flex flex-col"> 
                <div className = "flex justify-center"> 
                    <div className = "flex justify-center w-[584px] h-[46px] p-[6px] border border-[#dfe1e5] rounded-full hover:shadow-lg">
                        <input type="text" id = "search" autocomplete="off" className = "w-[483px] h-[34px] border-none outline-none" autofocus="true" onClick={() => {}}>

                        </input> 
                    </div>
                </div> 
                <div className = "flex justify-center"> 
                <div className = "h-[88px]">
                    <div className = "my-[15px]">
                        <button type="submit" className = "rounded bg-[#f8f9fa] min-h-[36px] px-[16px] mx-[6px] my-[11px] text-[#3c4043] hover:shadow">Google Search</button>
                        <button type="submit" className = "rounded bg-[#f8f9fa] min-h-[36px] px-[16px] mx-[6px] my-[11px] text-[#3c4043] hover:shadow">I'm Feeling Lucky</button>
                    </div> 
                </div>
                </div> 
            </form>
        </div> 
        <div className = "flex flex-col h-[459px] min-h-[160px]"> 
            <footer className = "flex-row bg-[#f2f2f2] w-screen mt-auto"> 
                <div className = "flex justify-between px-[20px] items-center">
                    <div className = "flex" id = "footer-left">
                        {
                            footer_links_left.map((item, index) => (
                                <div className = "p-[15px] flex text-[#70757A] text-[14px] hover:underline" key = {index}> 
                                    <Link href = {item.link}>
                                        {item.text}
                                    </Link> 
                                </div> 
                            )) 
                        }
                    </div> 
                    <div className = "flex justify-center" id = "footer-center">
                        {
                            footer_links_center.map((item, index) => (
                                <div className = "mx-[6px] flex text-[#70757A] text-[14px] hover:underline" key = {index}> 
                                    <Link href = {item.link}>
                                        {item.text}
                                    </Link> 
                                </div> 
                            )) 
                        }
                    </div>
                    <div className = "flex" id = "footer-right">
                        {
                            footer_links_right.map((item, index) => (
                                <div className = "p-[15px] flex text-[#70757A] text-[14px] hover:underline" key = {index}> 
                                    <Link href = {item.link}>
                                        {item.text}
                                    </Link> 
                                </div> 
                            )) 
                        }
                    </div>
                </div> 
            </footer>
        </div> 
    </div>
  )
}


export default Google