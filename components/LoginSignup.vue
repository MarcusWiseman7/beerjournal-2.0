<template>
    <div class="auth">
        <div v-if="step == 1" class="auth__inputs">
            <b-input label="Email" :error="errors.email || emailExists" :errorMsg="emailErrorMsg">
                <input
                    type="text"
                    autofocus
                    autocomplete="username"
                    maxlength="60"
                    v-model="contact.email"
                    placeholder="Enter your email..."
                    @blur="checkError('email')"
                    @input="recheckError('email')"
                    @keypress.enter="onClick"
                />
            </b-input>
            <div :class="{ hide: !showPassword }">
                <b-input label="Password" :error="errors.password" errorMsg="Min 6 characters">
                    <input
                        :type="passwordInputType ? 'password' : 'text'"
                        placeholder="Enter your password..."
                        ref="passwordInput"
                        autocomplete="current-password"
                        v-model="contact.password"
                        id="password"
                        @blur="checkError('password')"
                        @input="recheckError('password')"
                        @keypress.enter="onClick"
                    />
                    <img
                        v-if="passwordInputType"
                        class="eye"
                        src="@/assets/icons/eye-closed.svg"
                        alt="Hide"
                        @click="passwordInputType = false"
                    />
                    <img v-else class="eye" src="@/assets/icons/eye.svg" alt="Show" @click="passwordInputType = true" />
                </b-input>
            </div>
        </div>
        <div v-if="step == 2" class="auth__inputs">
            <b-input label="Display name" :error="errors.displayName || displayNameExists" :errorMsg="displayNameErrorMsg">
                <input
                    type="text"
                    maxlength="60"
                    v-model="contact.displayName"
                    placeholder="Enter a name to use..."
                    @blur="checkError('displayName')"
                    @input="recheckError('displayName')"
                    @keypress.enter="onClick"
                />
            </b-input>
        </div>

        <div class="auth__actions">
            <b-button group="main" :disabled="!formOK" @clicked="onClick">{{ btnText }}</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginSignup',
    data() {
        return {
            passwordInputType: true,
            showPassword: false,
            contact: {
                email: '',
                password: '',
                displayName: '',
            },
            errors: {
                email: false,
                password: false,
                displayName: false,
            },
            emailExists: false,
            displayNameExists: false,
            success: {
                email: false,
                password: false,
                displayName: false,
            },
            regex: {
                email: /\S+@\S+\.\S+/,
                password: /^.{6,}$/,
                displayName: /^.{3,}$/,
            },
            step: 1,
        };
    },
    computed: {
        emailErrorMsg() {
            return this.emailExists ? 'This email is already used' : 'Please enter a valid email';
        },
        displayNameErrorMsg() {
            return this.displayNameExists ? 'This name taken' : 'Min 4 characters';
        },
        formOK() {
            switch (this.step) {
                case 1:
                    if (!this.showPassword) {
                        return this.success.email;
                    } else {
                        return this.success.email && this.success.password;
                    }
                case 2:
                    return this.success.displayName;
            }
        },
        isSignup() {
            return this.$route.name == 'SignUp';
        },
        btnText() {
            if (!this.isSignup) return 'Enter';
            else {
                switch (this.step) {
                    case 1:
                        return 'Continue';
                    default:
                        return 'Enter';
                }
            }
        },
    },
    methods: {
        onClick() {
            if (!this.isSignup) this.tryLogin();
            else {
                switch (this.step) {
                    case 1:
                        this.checkEmail();
                        break;
                    case 2:
                        this.checkDisplayName();
                        break;
                }
            }
        },
        checkError(err) {
            this.errors[err] = this.contact[err].match(this.regex[err]) === null;
            if (!this.errors[err]) this.checkSuccess(err);
            return;
        },
        recheckError(err) {
            if (this.errors[err]) this.checkError(err);
            else this.checkSuccess(err);
        },
        checkSuccess(success) {
            this.success[success] = this.contact[success].match(this.regex[success]) !== null;
        },
        showPasswordNow() {
            this.showPassword = true;
            this.contact.password = '';
            this.$refs.passwordInput.focus();
        },
        async tryLogin() {
            if (!this.success.password) return this.showPasswordNow();

            try {
                let result = await this.$store.dispatch('login', {
                    email: this.contact.email,
                    password: this.contact.password,
                });

                if (result && result.statusCode > 0) this.$router.replace('/');
                else this.showPasswordNow();
            } catch (err) {}
        },
        checkEmail() {
            this.$store.dispatch('checkDB', { email: this.contact.email }).then(res => {
                if (res.statusCode < 0) {
                    this.emailExists = true;
                } else {
                    this.emailExists = false;
                    this.step++;
                }
            });
        },
        checkDisplayName() {
            this.$store.dispatch('checkDB', { displayName: this.contact.displayName }).then(res => {
                if (res.statusCode < 0) {
                    this.displayNameExists = true;
                } else {
                    this.displayNameExists = false;
                    this.addUser();
                }
            });
        },
        addUser() {
            if (!this.formOK) return;

            this.$store.dispatch('addUser', this.contact);
        },
    },
    created() {
        if (this.$route.name == 'SignUp') this.showPassword = true;
    },
};
</script>

<style lang="scss" scoped>
.auth {
    &__inputs {
        margin: 20px 0 40px 0;
        min-width: 300px;
    }
}

.eye {
    position: absolute;
    right: 12px;
    top: 10px;
    cursor: pointer;
}

.hide {
    overflow: hidden;
    height: 0;
}
</style>
