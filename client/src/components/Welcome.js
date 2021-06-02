function Welcome(){
    return(
        <div className="wrapper">
            <div className="title">
                <h2>Welcome!</h2>
            </div>
            <div className="content">
                <p>This website is an exercise tracker.  You can create an account with a unique username that will be assigned an id.  With the id given, you can add exercises to your account and you can view your exercise log.  Your exercise log can be limited to within a date range and to only show a given number of exercises.</p>
            </div>
        </div>
    );
}

export default Welcome;