import { getsupabase } from './api.js';
const supabase = getsupabase();
// let currentUser = null;
console.log(supabase);

let btnlogin = document.getElementById("btn-login")

if (btnlogin) {
    btnlogin.addEventListener("click", async function (e) {
        e.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Swal.fire({
                title: 'Login Failed',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'create Account or Try Again'
            });
            return;
        }

        // currentUser = data.user;

        Swal.fire({
            title: 'Login Successful!',
            text: 'Welcome back!',
            icon: 'success',
            confirmButtonText: 'Continue'
        });

        console.log("User logged in:", data.user);
        email =""
        password =""
    });
};


let backlogin = document.getElementById("back-to-login");
if (backlogin) {
    backlogin.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "index.html";
    })
}

let btnsignup = document.getElementById("btn-signup");
if (btnsignup) {
    btnsignup.addEventListener("click", function (e) {
        e.preventDefault()
        window.location.href = "signup.html";
    });
}

let signName = document.getElementById("sign-name");
let signEmail = document.getElementById("sign-email");
let signPassword = document.getElementById("sign-password");
let signPhnumber = document.getElementById("sign-phone");


let btncreate = document.getElementById("btn-create");
if (btncreate) {
    btncreate.addEventListener("click", async function (e) {
        e.preventDefault();
        if (!signEmail.value || !signPassword.value || !signName.value || !signPhnumber.value) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Info',
                text: 'Please fill all fields before signing up.',
            });
            return;
        }

        // Signup request
        const { data, error } = await supabase.auth.signUp({
            email: signEmail.value,
            password: signPassword.value,
            options: {
                data: {
                    first_name: signName.value,
                    phone_number: signPhnumber.value
                }
            }
        });

        // insert data in table
        async function insertdata() {
            const { error } = await supabase
                .from('login')
                .update({
                    username: signName.value,
                    useremail: signEmail.value,
                    password: signPassword.value,
                    "phone": signPhnumber.value
                })
                .eq('id',)
                .select()
        }

        insertdata(data[0])

        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: error.message,
            });
            return;
        }

        // Success - show user info
        const user = data.user;
        const { error: insertError } = await supabase
            .from('login')
            .insert({
                username: signName.value,
                useremail: signEmail.value,
                phone: signPhnumber.value,
            });

        if (insertError) {
            console.error("Insert error:", insertError.message);
        } else {
            console.log("Inserted into login table");
        }

        console.log("Email:", user.email);
        console.log("Name:", user.user_metadata.first_name);
        console.log("Phone:", user.user_metadata.phone_number);

        Swal.fire({
            icon: 'success',
            title: 'Signup Successful',
            text: 'Please check your email to confirm your account.',
        });
    });
}



let btngoogle = document.getElementById("btn-google");
let btngithub = document.getElementById("btn-github");
let btnfacebook = document.getElementById("btn-facebook")

async function checkSession() {
    const {
        data: { session }
    } = await supabase.auth.getSession();

    return session && session.user;
}

// Google OAuth
if (btngoogle) {
    btngoogle.addEventListener("click", async function (e) {
        e.preventDefault();

        const user = await checkSession();

        if (!user) {
            Swal.fire({
                title: 'Login Required',
                text: 'Please login first.',
                icon: 'warning'
            });
            return;
        }

        await supabase.auth.signInWithOAuth({ provider: 'google' });
    });
}

// GitHub OAuth
if (btngithub) {
    btngithub.addEventListener("click", async function (e) {
        e.preventDefault();

        const user = await checkSession();

        if (!user) {
            Swal.fire({
                title: 'Login Required',
                text: 'Please login first.',
                icon: 'warning'
            });
            return;
        }

        await supabase.auth.signInWithOAuth({ provider: 'github' });
    });
}

// Facebook OAuth
if (btnfacebook) {
    btnfacebook.addEventListener("click", async function (e) {
        e.preventDefault();

        const user = await checkSession();

        if (!user) {
            Swal.fire({
                title: 'Login Required',
                text: 'Please login first.',
                icon: 'warning'
            });
            return;
        }

        await supabase.auth.signInWithOAuth({ provider: 'facebook' });
    });
}


let btnlogout = document.getElementById("btn-logout");
if (btnlogout) {
    btnlogout.addEventListener("click", async function (e) {
        e.preventDefault();

        const { error } = await supabase.auth.signOut();

        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Logout Failed',
                text: error.message,
            });
            return;
        }

        // currentUser = null;

        Swal.fire({
            icon: 'info',
            title: 'Logged Out',
            text: 'You have been signed out.',
        }).then(() => {
            window.location.href = "index.html"; // or login page
        });
    });
}


let forgetpassword = document.getElementById("forget-password");
if(forgetpassword){
   forgetpassword.addEventListener("click" , async function(e){
      e.preventDefault();
      window.location.href = "forget.html";
   });
}



// Forget Password Logic
let sendResetBtn = document.getElementById("btn-forgot");
if (sendResetBtn) {
  sendResetBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const email = document.getElementById("forgot-email").value;

    if (!email) {
      Swal.fire("Missing Email", "Please enter your email.", "warning");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://127.0.0.1:5500/reset.html'  // ← yeh URL tumhare hosted update.html ka ho
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
    } else {
      Swal.fire("Success", "Reset link sent. Check your email.", "success");
    }
  });
}



// Reset Password Logic
let resetBtn = document.getElementById("reset-btn");
if (resetBtn) {
  resetBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const newPassword = document.getElementById("new-password").value;

    if (!newPassword) {
      Swal.fire("Missing Password", "Please enter a new password.", "warning");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
    } else {
      Swal.fire("Success", "Password updated successfully!", "success").then(() => {
        window.location.href = "index.html";
      });
    }
  });
}
