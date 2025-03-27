import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Section,
    Text,
  } from "@react-email/components";
  
  interface VerificationEmailProps {
    username: string;
    otp: string;
  }
  
  export default function VerificationEmail({
    username,
    otp,
  }: VerificationEmailProps) {
    return (
      <Html>
        <Head />
        <Body style={main}>
          <Container style={container}>
            {/* <Img
              src={`${process.env.DOMAIN_NAME || "https://mystery-message-five.vercel.app"}/logo.png`}
              width="250"
              height="135"
              alt="Mystery Message"
              style={logo}
            /> */}
            <Text style={tertiary}>Hello, @{username || "user"}</Text>
            <Heading style={secondary}>
              Enter the following code to verify your account.
            </Heading>
            <Section style={codeContainer}>
              <Text style={code}>{otp || "123456"}</Text>
            </Section>
            <Text style={paragraph}>Not expecting this email?</Text>
            <Text style={paragraph}>
              Contact{" "}
              <Link href="mailto:sujeetgund@gmail.com" style={link}>
                sujeetgund@gmail.com
              </Link>{" "}
              if you did not request this code.
            </Text>
          </Container>
          <Text style={footer}>Securely powered by Mystery Message</Text>
        </Body>
      </Html>
    );
  }
  
  // Styles
  const main = {
    backgroundColor: "#ffffff",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  };
  
  const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #eee",
    borderRadius: "5px",
    boxShadow: "0 5px 10px rgba(20,50,70,.2)",
    marginTop: "20px",
    maxWidth: "360px",
    margin: "0 auto",
    padding: "68px 0 130px",
  };
  
  const logo = {
    margin: "0 auto",
  };
  
  const tertiary = {
    color: "#0a85ea",
    fontSize: "21px",
    fontWeight: 700,
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    height: "16px",
    letterSpacing: "0",
    lineHeight: "16px",
    margin: "36px 8px 8px 8px",
    textAlign: "center" as const,
  };
  
  const secondary = {
    color: "#000",
    display: "inline-block",
    fontFamily: "HelveticaNeue-Medium,Helvetica,Arial,sans-serif",
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "24px",
    marginBottom: "0",
    marginTop: "0",
    textAlign: "center" as const,
  };
  
  const codeContainer = {
    background: "rgba(0,0,0,.05)",
    borderRadius: "4px",
    margin: "16px auto 14px",
    verticalAlign: "middle",
    width: "280px",
  };
  
  const code = {
    color: "#000",
    display: "inline-block",
    fontFamily: "HelveticaNeue-Bold",
    fontSize: "32px",
    fontWeight: 700,
    letterSpacing: "6px",
    lineHeight: "40px",
    paddingBottom: "8px",
    paddingTop: "8px",
    margin: "0 auto",
    width: "100%",
    textAlign: "center" as const,
  };
  
  const paragraph = {
    color: "#444",
    fontSize: "15px",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    letterSpacing: "0",
    lineHeight: "23px",
    padding: "0 40px",
    margin: "0",
    textAlign: "center" as const,
  };
  
  const link = {
    color: "#444",
    textDecoration: "underline",
  };
  
  const footer = {
    color: "#000",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0",
    lineHeight: "23px",
    margin: "0",
    marginTop: "20px",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    textAlign: "center" as const,
    textTransform: "uppercase" as const,
  };