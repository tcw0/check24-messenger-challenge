import React, { MouseEvent } from "react"
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from "@mui/material"

import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import LanguageIcon from "@mui/icons-material/Language"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { ConversationContext } from "../../contexts/ConversationContext/ConversationContext"
import { AuthContext } from "../../contexts/AuthContext/AuthContext"
import { ConversationStateEnum } from "../../types/ConversationDto"

function ChatHeader() {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  )
  const [emailAnchorEl, setEmailAnchorEl] = React.useState<null | HTMLElement>(
    null
  )
  const [phoneAnchorEl, setPhoneAnchorEl] = React.useState<null | HTMLElement>(
    null
  )
  const [urlAnchorEl, setUrlAnchorEl] = React.useState<null | HTMLElement>(null)

  const conversationContext = React.useContext(ConversationContext)
  const authContext = React.useContext(AuthContext)

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setMenuAnchorEl(null)
  }

  const handleEmailClick = (event: MouseEvent<HTMLElement>) => {
    setEmailAnchorEl(event.currentTarget)
  }
  const handleCloseEmail = () => {
    setEmailAnchorEl(null)
  }

  const handlePhoneClick = (event: MouseEvent<HTMLElement>) => {
    setPhoneAnchorEl(event.currentTarget)
  }
  const handleClosePhone = () => {
    setPhoneAnchorEl(null)
  }

  const handleUrlClick = (event: MouseEvent<HTMLElement>) => {
    setUrlAnchorEl(event.currentTarget)
  }
  const handleCloseUrl = () => {
    setUrlAnchorEl(null)
  }

  const name = () => {
    if (conversationContext.selectedConversation) {
      if (authContext.userType === "customer") {
        return conversationContext.selectedConversation.service_provider_name
      } else {
        return conversationContext.selectedConversation.customer_name
      }
    }
  }

  const picture = () => {
    if (conversationContext.selectedConversation) {
      if (authContext.userType === "customer") {
        return conversationContext.selectedConversation.service_provider_id
          .picture
      } else {
        return conversationContext.selectedConversation.customer_id.picture
      }
    }
  }

  const acceptedChat = () => {
    if (
      conversationContext.selectedConversation &&
      conversationContext.selectedConversation.state ===
        ConversationStateEnum.ACCEPTED
    ) {
      return true
    } else {
      return false
    }
  }

  const email = () => {
    if (conversationContext.selectedConversation) {
      if (authContext.userType === "customer") {
        return conversationContext.selectedConversation.service_provider_id
          .email
      } else {
        return conversationContext.selectedConversation.customer_id.email
      }
    }
  }

  const phone = () => {
    if (conversationContext.selectedConversation) {
      if (authContext.userType === "customer") {
        return conversationContext.selectedConversation.service_provider_id
          .phone
      } else {
        return conversationContext.selectedConversation.customer_id.phone
      }
    }
  }

  const url = () => {
    if (conversationContext.selectedConversation) {
      if (authContext.userType === "customer") {
        return conversationContext.selectedConversation.service_provider_id.url
      }
    }
  }

  return (
    <Box
      p={2}
      width={"100%"}
      height={"80px"}
      sx={{
        backgroundColor: "#F8FAFF",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        alignItems={"center"}
        direction={"row"}
        sx={{ width: "100%", height: "100%" }}
        justifyContent="space-between"
      >
        <Stack spacing={2} direction="row" alignItems="center">
          <Box>
            <Avatar
              alt={name()}
              src={picture()}
              variant="circular"
              sx={{ height: 56, width: 56 }}
            />
          </Box>
          <Typography variant="h5" py={3} maxHeight="80px" fontWeight="bold">
            {name()}
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems="center" spacing={3}>
          <IconButton onClick={handleEmailClick} disabled={!acceptedChat()}>
            <EmailIcon />
          </IconButton>
          <Menu
            anchorEl={emailAnchorEl}
            open={Boolean(emailAnchorEl)}
            onClose={handleCloseEmail}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MenuItem
              onClick={() =>
                window.open(
                  `mailto:${email()}?subject=Subject&body=Body%20goes%20here`
                )
              }
            >
              <Typography sx={{ p: 2 }}>{email()}</Typography>
            </MenuItem>
          </Menu>
          <IconButton onClick={handlePhoneClick} disabled={!acceptedChat()}>
            <PhoneIcon />
          </IconButton>
          <Popover
            anchorEl={phoneAnchorEl}
            open={Boolean(phoneAnchorEl)}
            onClose={handleClosePhone}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Typography sx={{ p: 2 }}>{phone()}</Typography>
          </Popover>
          <IconButton onClick={handleUrlClick} disabled={!acceptedChat()}>
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={urlAnchorEl}
            open={Boolean(urlAnchorEl)}
            onClose={handleCloseUrl}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MenuItem onClick={() => window.open(`${url()}`)}>
              <Typography sx={{ p: 2 }}>{url()}</Typography>
            </MenuItem>
          </Menu>

          <Divider orientation="vertical" flexItem />
          <IconButton onClick={handleMenuClick}>
            <ExpandMoreIcon />
          </IconButton>
          <Menu
            id="conversation-menu"
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box p={1}>
              <Stack spacing={1}>
                <MenuItem onClick={handleCloseMenu}>
                  <Stack
                    sx={{ minWidth: 100 }}
                    direction="row"
                    alignItems={"center"}
                    justifyContent="space-between"
                  >
                    <Typography>Delete chat</Typography>
                  </Stack>
                </MenuItem>
              </Stack>
            </Box>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  )
}

export default ChatHeader
