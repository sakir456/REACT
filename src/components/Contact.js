const Contact = () => {
    return (
        <div>
            <h1 className="font-bold text-3xl p-4 m-4">Contact Us Page</h1>
            <form>
                <input type="text"
                className=" border border-black p-2 m-2"
                placeholder="name"
                />
                <input type="text"
                className=" border border-black p-2 m-2"
                placeholder="Message"
                />
                <button className=" border border-black p-2 m-2 rounded-md bg-gray-100">Submit</button>
            </form>

        </div>
    );
};
export default Contact;