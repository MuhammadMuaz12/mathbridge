import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'MathBridge · Your path through algebra',description:'Discover your starting point in algebra. Learn with clear lessons, guided practice and a path that grows with you.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
