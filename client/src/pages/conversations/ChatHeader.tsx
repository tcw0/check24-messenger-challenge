import React, { MouseEvent } from "react"
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Rating,
  Stack,
  Typography,
} from "@mui/material"

import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import LanguageIcon from "@mui/icons-material/Language"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import SendIcon from "@mui/icons-material/Send"

import { ConversationContext } from "../../contexts/ConversationContext/ConversationContext"
import { AuthContext } from "../../contexts/AuthContext/AuthContext"
import { ConversationStateEnum } from "../../types/ConversationDto"

function ChatHeader({
  handleComplete,
  handleReview,
  handleDelete,
}: {
  handleComplete: () => Promise<boolean>
  handleReview: (rating: number) => Promise<boolean>
  handleDelete: () => Promise<boolean>
}) {
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
  const [disableComplete, setDisableComplete] = React.useState(true)
  const [disableReview, setDisableReview] = React.useState(true)
  const [disableDelete, setDisableDelete] = React.useState(true)
  const [reviewAnchorEl, setReviewAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const [ratingStars, setRatingStars] = React.useState<number>(5)

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

  const handleReviewClick = (event: MouseEvent<HTMLElement>) => {
    setReviewAnchorEl(event.currentTarget)
  }
  const handleCloseReview = () => {
    setReviewAnchorEl(null)
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

  React.useEffect(() => {
    const conversationState = conversationContext.selectedConversation?.state

    if (conversationState === ConversationStateEnum.ACCEPTED) {
      setDisableComplete(false)
    } else if (conversationState === ConversationStateEnum.COMPLETED) {
      setDisableReview(false)
    } else if (conversationState === ConversationStateEnum.REVIEWED) {
      setDisableDelete(false)
    }
  }, [conversationContext.selectedConversation])

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
                <MenuItem
                  onClick={async () => {
                    if (await handleComplete()) {
                      setDisableComplete(true)
                      setDisableReview(false)
                    }
                  }}
                  disabled={disableComplete}
                >
                  <Stack
                    sx={{ minWidth: 100 }}
                    direction="row"
                    alignItems={"center"}
                    justifyContent="space-between"
                  >
                    <Typography>Complete chat</Typography>
                  </Stack>
                </MenuItem>
                {authContext.userType === "customer" && (
                  <>
                    <MenuItem
                      onClick={handleReviewClick}
                      disabled={disableReview}
                    >
                      <Stack
                        sx={{ minWidth: 100 }}
                        direction="row"
                        alignItems={"center"}
                        justifyContent="space-between"
                      >
                        <Typography>Leave a review</Typography>
                      </Stack>
                    </MenuItem>
                    <Popover
                      anchorEl={reviewAnchorEl}
                      open={Boolean(reviewAnchorEl)}
                      onClose={handleCloseReview}
                      anchorOrigin={{ vertical: "center", horizontal: "left" }}
                      transformOrigin={{
                        vertical: "center",
                        horizontal: "right",
                      }}
                    >
                      <Box display={"flex"} alignItems={"center"} p={2}>
                        <Rating
                          size="large"
                          value={ratingStars}
                          onChange={(
                            _: React.SyntheticEvent<Element, Event>,
                            newValue: number | null
                          ) => setRatingStars(newValue || 5)}
                          sx={{
                            pr: 2,
                          }}
                        />
                        <IconButton
                          onClick={async (event) => {
                            if (await handleReview(ratingStars)) {
                              setDisableReview(true)
                              setDisableDelete(false)
                              handleReviewClick(event)
                            }
                          }}
                          color="primary"
                        >
                          <SendIcon />
                        </IconButton>
                      </Box>
                    </Popover>
                  </>
                )}
                <MenuItem
                  onClick={async () => {
                    if (await handleDelete()) {
                      setDisableDelete(true)
                    }
                  }}
                  disabled={disableDelete}
                >
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
