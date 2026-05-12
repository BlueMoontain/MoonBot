require("dotenv").config();

const axios =
  require("axios");

const session =
  require("express-session");

const express = require("express");
const path = require("path");

const commandsRoute = require("./routes/commands");

const app = express();

// ==== Session ====

app.use(express.json());

// app.use("/api/commands", commandsRoute);


// Oauth2 ajout


app.use(

  session({

    secret:
      process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {

      secure: false
    }
  })
);


// ===== Auth Middleware ======

function requireAuth(
  req,
  res,
  next
) {

  if (
    req.session.user
  ) {

    return next();
  }

  res.redirect("/login");
}
// ===== Login Page=====

app.get(

  "/auth/discord",

  (req, res) => {

    const redirect =

      "https://discord.com/api/oauth2/authorize" +

      `?client_id=${process.env.DISCORD_CLIENT_ID}` +

      "&response_type=code" +

      `&redirect_uri=${encodeURIComponent(
        process.env.DISCORD_CALLBACK_URL
      )}` +

      "&scope=identify";

    res.redirect(redirect);
  }
);

// ===== OAuth Callback =====

app.get(

  "/auth/discord/callback",

  async (req, res) => {

    const code =
      req.query.code;

    if (!code) {

      return res.send(
        "❌ No code provided"
      );
    }

    try {

      // ===== Token Exchange =====

      const tokenResponse =
        await axios.post(

          "https://discord.com/api/oauth2/token",

          new URLSearchParams({

            client_id:
              process.env.DISCORD_CLIENT_ID,

            client_secret:
              process.env.DISCORD_CLIENT_SECRET,

            grant_type:
              "authorization_code",

            code,

            redirect_uri:
              process.env.DISCORD_CALLBACK_URL
          }),

          {

            headers: {

              "Content-Type":
                "application/x-www-form-urlencoded"
            }
          }
        );

      const accessToken =
        tokenResponse.data.access_token;


      // ===== Fetch Discord User =====

      const userResponse =
        await axios.get(

          "https://discord.com/api/users/@me",

          {

            headers: {

              Authorization:
                `Bearer ${accessToken}`
            }
          }
        );

      const discordUser =
        userResponse.data;


      // ===== Admin Check =====

      const adminIds =

  process.env.ADMIN_DISCORD_IDS
    .split(",");

if (
  !adminIds.includes(
    discordUser.id
  )
) {

        return res.send(
          "❌ Unauthorized"
        );
      }


      // ===== Session =====

      req.session.user =
        discordUser;

      res.redirect("/");

    } catch (error) {

      console.error(
        "OAuth Error:",
        error.response?.data ||
        error.message
      );

      res.send(
        "❌ OAuth failed"
      );
    }
  }
);

// route login page 
app.get(

  "/login",

  (req, res) => {
    if (req.session.user) {

  return res.redirect("/");
}

    res.send(`

      <h1>
        Botstarion Panel
      </h1>

      <a href="/auth/discord">
        Login with Discord
      </a>
    `);
  }
);

 // ===== route user session =====
 app.get(

  "/api/me",

  requireAuth,

  (req, res) => {

    res.json({
      user: req.session.user
    });
  }
);

app.use(

  "/api/commands",

  requireAuth,

  commandsRoute
);
app.use(

  requireAuth,

  express.static(
    path.join(
      __dirname,
      "public"
    )
  )
);

// ===== logout =====
app.get(

  "/logout",

  (req, res) => {

    req.session.destroy(() => {

      res.redirect("/login");
    });
  }
);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🌍 Web panel running on http://localhost:${PORT}`);
});
