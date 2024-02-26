import Link from "next/link";

export default function PagePowens() {

    return (
        <>
        <div>
            <h1 className="text-center">PagePowens</h1>
        </div>
        <div className='text-center'>
            <Link href="/page-proof">
                Hello
            </Link>
        </div>
        </>
    );
}