import React from 'react'
import { IconButton, Tooltip, Stack } from '@mui/material'
import { Share, Twitter, Facebook, LinkedIn, Link as LinkIcon } from '@mui/icons-material'

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
  onShare?: () => void
}

const SocialShare: React.FC<SocialShareProps> = ({
  url = window.location.href,
  title = "OriginVault Schema Registry",
  description = "Explore and generate TypeScript types from JSON Schemas",
  onShare
}) => {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      if (onShare) onShare()
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer')
    if (onShare) onShare()
  }

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    window.open(facebookUrl, '_blank', 'noopener,noreferrer')
    if (onShare) onShare()
  }

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer')
    if (onShare) onShare()
  }

  const handleGenericShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        })
        if (onShare) onShare()
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err)
        }
      }
    } else {
      // Fallback to copy link
      handleCopyLink()
    }
  }

  return (
    <Stack direction="row" spacing={0.5}>
      <Tooltip title="Share">
        <IconButton size="small" onClick={handleGenericShare}>
          <Share fontSize="small" />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Copy Link">
        <IconButton size="small" onClick={handleCopyLink}>
          <LinkIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Share on Twitter">
        <IconButton size="small" onClick={handleTwitterShare}>
          <Twitter fontSize="small" />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Share on Facebook">
        <IconButton size="small" onClick={handleFacebookShare}>
          <Facebook fontSize="small" />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Share on LinkedIn">
        <IconButton size="small" onClick={handleLinkedInShare}>
          <LinkedIn fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}

export default SocialShare 