function HelpPage() {
  return (
    <div
      style={{
        height: "100%",
        display:"flex",
        flexDirection: "column",
        gap: "0.25rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>
        Course Port
      </h1>
      <div>
        WIP
      </div>
      <div>
        The data tries to be as accurate as possible (scraped & parsed from LSU Schedule Booklet)
      </div>
      <div>
        Data was last updated on November 19th
      </div>
      <div>
        If you come across any bugs or inaccuracies, please don't hesitate to reach out to me at ganhaquegnq@gmail.com.
      </div>
      <h2>
        Tips & Tricks
      </h2>
      {/* <div> */}
      {/*   - You can also use middle mouse click to select a course. */}
      {/* </div> */}
      <div>
        - You can resize some stuffs by draggin the bottom right corner
      </div>
    </div>
  )
};

export default HelpPage;
