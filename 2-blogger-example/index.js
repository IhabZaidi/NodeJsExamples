const express = require('express');

const app = express();
app.use(express.json())


app.use("/login", require("./routes/login"));


app.use("/logout", require("./routes/logout"));


app.use("/posts", require("./routes/posts"));


app.use("/register", require("./routes/register"));


app.get("", (req, res) => {
    return res.json("okey");
})

app.listen(3000, "0.0.0.0", () => {
    console.log('live');
});