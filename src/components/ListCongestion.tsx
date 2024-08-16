import { People } from "@mui/icons-material"
import { Avatar, AvatarGroup, Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material"
import { amber, green, red } from "@mui/material/colors"
import { CongestionLevel, Data } from "../lib/congestion"

export interface ListCongestionItemProps {
  level: CongestionLevel
  primary: string
  divider?: boolean
}

export function ListCongestionItem({
  level,
  primary,
  divider = false,
}: ListCongestionItemProps) {
  switch (level) {
    case CongestionLevel.Low:
      return (
        <>
          <ListItem>
            <ListItemText primary={primary} secondary='少ない' />
            <AvatarGroup max={3}>
              <Avatar sx={{ bgcolor: green[500] }}>
                <People />
              </Avatar>
            </AvatarGroup>
          </ListItem>
          {divider && <Divider component={'li'} />}
        </>
      )

    case CongestionLevel.Moderate:
      return (
        <>
          <ListItem>
            <ListItemText primary={primary} secondary='ほどほど' />
            <AvatarGroup max={3}>
              <Avatar sx={{ bgcolor: amber[500] }}>
                <People />
              </Avatar>
              <Avatar sx={{ bgcolor: amber[500] }}>
                <People />
              </Avatar>
            </AvatarGroup>
          </ListItem>
          {divider && <Divider component={'li'} />}
        </>
      )

    case CongestionLevel.High:
      return (
        <>
          <ListItem>
            <ListItemText primary={primary} secondary='多い' />
            <AvatarGroup max={3}>
              <Avatar sx={{ bgcolor: red[500] }}>
                <People />
              </Avatar>
              <Avatar sx={{ bgcolor: red[500] }}>
                <People />
              </Avatar>
              <Avatar sx={{ bgcolor: red[500] }}>
                <People />
              </Avatar>
            </AvatarGroup>
          </ListItem>
          {divider && <Divider component={'li'} />}
        </>
      )
  }
}

export interface ListCongestionProps {
  data: Data | null
}

export function ListCongestion({ data }: ListCongestionProps) {
  return data ? (
    <List sx={{ maxWidth: 300 }}>
      {[...Array(data.length)].map((_, i) => (
        <ListCongestionItem
          key={i}
          level={data.data[i]}
          primary={`${i + 1}号車`}
          divider={i !== data.length - 1}
        />
      ))}
    </List>
  ) : (
    <Box sx={{ p: 3, border: '1px dashed gray' }}>
      <Typography>ステップ3まで入力すると、混雑度を表示できます。</Typography>
    </Box>
  )
}
