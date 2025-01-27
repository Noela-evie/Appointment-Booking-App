import { useContext, useState } from "react";
// react-router-dom components
import { Link } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
// Images
import bgImage from "assets/images/bg-sign-up-cover.jpg";
import { AuthContext } from "context";
import { InputLabel } from "@mui/material";

function Register() {
  const authContext = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    NIN: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    NINError: false,
    passwordError: false,
    error: false,
    errorText: "",
    loading: false,
  });

  const changeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name + "Error"]: false });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrors({ ...errors, loading: true });
    const mailFormat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (inputs.name.trim().length === 0) {
      setErrors({ ...errors, nameError: true, loading: false });
      return;
    }
    if (inputs.NIN.trim().length !== 14) {
      setErrors({ ...errors, NINError: true, loading: false });
      return;
    }
    if (inputs.email.trim().length === 0 || !inputs.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true, loading: false });
      return;
    }
    if (!inputs.password.trim() || inputs.password.trim().length < 8) {
      setErrors({ ...errors, passwordError: true, loading: false });
      return;
    }

    // here will be the post action to add a user to the db
    const newUser = {
      name: inputs.name,
      email: inputs.email,
      NIN: inputs.NIN,
      password: inputs.password,
    };
    const registerData = {
      name: inputs.name,
      email: inputs.email,
      NIN: inputs.NIN,
      password: inputs.password,
    };
    try {
      const response = await authContext.register(registerData);
      console.log("Response:", response);
      setInputs({
        name: "",
        email: "",
        NIN: "",
        password: "",
      });
      setErrors({
        nameError: false,
        emailError: false,
        NINError: false,
        passwordError: false,
        error: false,
        errorText: "",
        loading: false,
      });
    } catch (err) {
      setErrors({
        ...errors,
        error: true,
        errorText: err.message,
        loading: false,
      });
      console.error(err);
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography
            display="block"
            variant="button"
            color="white"
            my={1}
          >
            Enter your details to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                fullWidth
                name="name"
                value={inputs.name}
                onChange={changeHandler}
                error={errors.nameError}
                inputProps={{
                  autoComplete: "name",
                  form: {
                    autoComplete: "off",
                  },
                }}
              />
              {errors.nameError && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                  The name can not be empty
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2}>
          <MDInput
            type="email"
            label="Email"
            variant="standard"
            fullWidth
            value={inputs.email}
            name="email"
            onChange={changeHandler}
            error={errors.emailError}
            inputProps={{
              autoComplete: "email",
              form: {
                autoComplete: "off",
              },
            }}
          />
          {errors.emailError && (
            <MDTypography variant="caption" color="error" fontWeight="light">
              The email must be valid
            </MDTypography>
          )}
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="NIN"
            variant="standard"
            fullWidth
            name="NIN"
            value={inputs.NIN}
            onChange={changeHandler}
            error={errors.NINError}
            inputProps={{
              autoComplete: "NIN",
              form: {
                autoComplete: "off",
              },
            }}
          />
          {errors.NINError && (
            <MDTypography variant="caption" color="error" fontWeight="light">
              The NIN must have 14 characters
            </MDTypography>
          )}
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="password"
            label="Password"
            variant="standard"
            fullWidth
            name="password"
            value={inputs.password}
            onChange={changeHandler}
            error={errors.passwordError}
          />
          {errors.passwordError && (
            <MDTypography variant="caption" color="error" fontWeight="light">
              The password must be of at least 8 characters
            </MDTypography>
          )}
        </MDBox>
        {errors.error && (
          <MDTypography variant="caption" color="error" fontWeight="light">
            {errors.errorText}
          </MDTypography>
        )}
        <MDBox mt={4} mb={1}>
          <MDButton
            variant="gradient"
            color="info"
            fullWidth
            type="submit"
            disabled={errors.loading}
          >
            {errors.loading ? "Loading..." : "Sign up"}
          </MDButton>
        </MDBox>
        <MDBox mt={3} mb={1} textAlign="center">
          <MDTypography variant="button" color="text">
            Already have an account?{" "}
            <MDTypography
              component={Link}
              to="/auth/login"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign In
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  </Card>
</CoverLayout>

);
}

export default Register;
