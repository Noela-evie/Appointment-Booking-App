import { useContext, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayoutLanding from "layouts/authentication/components/BasicLayoutLanding";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpg";

import { AuthContext } from "context";

function Login() {
  const authContext = useContext(AuthContext);

  const [credentialsErrors, setCredentialsError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [inputs, setInputs] = useState({
    NIN: "", 
    password: "", 
  });

  const [errors, setErrors] = useState({
    NINError: false,
    passwordError: false,
  });


  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  

    if (inputs.NIN.trim().length < 14) {
      setErrors({ ...errors, NINError: true });
      return;
    }

    if (inputs.password.trim().length < 8) {
      setErrors({ ...errors, passwordError: true });
      return;
    }

    const loginData = {
      NIN: inputs.NIN,
      password: inputs.password
    }
    try {
      const response = await authContext.login(loginData);
    } catch (error) {
      if (error.message) {
        setCredentialsError("Invalid credentials");
      }
      setInputs({ NIN: "", password: "", });
      setErrors({ NINError: false, passwordError: false, });
    }
  };


  return (
    <BasicLayoutLanding image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="NIN"
                fullWidth
                value={inputs.NIN}
                name="NIN"
                onChange={changeHandler}
                error={errors.NINError}
              />
              {errors.NINError && (
    <MDTypography variant="caption" color="error" fontWeight="light">
      NIN must be at least 14 characters.
    </MDTypography>
  )}
            </MDBox>
            
            <MDBox mb={2}>
              <MDInput
                type={showPassword ? "text" : "password"} 
                label="Password"
                fullWidth
                name="password"
                value={inputs.password}
                onChange={changeHandler}
                error={errors.passwordError}
              />
              {errors.passwordError && (
    <MDTypography variant="caption" color="error" fontWeight="light">
      Password must be at least 8 characters.
    </MDTypography>
  )}
              <MDBox mb={2}>
  
  <MDBox display="flex" alignItems="center" ml={-1} mt={1}>
    <Switch checked={showPassword} onChange={handleTogglePassword} /> {/* Switch for show/hide password */}
    <MDTypography
      variant="button"
      fontWeight="regular"
      color="text"
      onClick={handleTogglePassword}
      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
    >
      &nbsp;&nbsp;Show password
    </MDTypography>
  </MDBox>
</MDBox>
            </MDBox>
            
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                sign in
              </MDButton>
            </MDBox>
          
            {credentialsErrors && (
  <MDTypography variant="caption" color="error" fontWeight="light">
    {credentialsErrors}
  </MDTypography>
)}
            <MDBox mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/auth/register"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayoutLanding>
  );
}

export default Login;
