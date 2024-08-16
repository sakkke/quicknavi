import { ArrowDownwardRounded, FlagRounded, LocationOnRounded, ScheduleRounded, TrainRounded } from '@mui/icons-material'
import { AppBar, Autocomplete, Box, Chip, Container, Divider, InputAdornment, Paper, Stack, TextField, Toolbar, Typography } from '@mui/material'
import trainUnknown from './assets/Train Unknown.svg'
import { createClient } from './lib/supabase'
import { SyntheticEvent, useEffect, useState } from 'react'
import { getTrainPreview } from './lib/train'

export default function App() {
  const [trainNameOptions, setTrainNameOptions] = useState<any[]>([])
  useEffect(() => {
    const supabase = createClient()

    const fetchTrains = async () => {
      const { data: trains } = await supabase.from('trains').select()
      if (trains) {
        const names = trains.map((train) => train.name)
        setTrainNameOptions(names)
      }
    }

    fetchTrains()
  }, [])

  const [trainName, setTrainName] = useState('')
  const [trainPreview, setTrainPreview] = useState(trainUnknown)
  const [trainId, setTrainId] = useState(0)
  const handleTrainName = (_event: SyntheticEvent, value: string) => {
    setTrainName(value)
    setTrainPreview(getTrainPreview(value))

    const supabase = createClient()

    const fetchTrainId = async () => {
      const { data } = await supabase
        .from('trains')
        .select()
        .eq('name', value)
        .select('id')
        .limit(1)
        .single()
      if (data) {
        setTrainId(data.id)
      }
    }

    fetchTrainId()
  }

  const [stationNameOptions, setStationNameOptions] = useState<any[]>([])
  useEffect(() => {
    const supabase = createClient()

    const fetchStations = async () => {
      const { data: stations } = await supabase
        .from('stations')
        .select()
        .eq('train_id', trainId)
      if (stations) {
        const names = stations.map((station) => station.name)
        setStationNameOptions(names)
      }
    }

    fetchStations()
  }, [trainId])

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Typography>QuickNavi</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container sx={{ my: 3 }}>
        <Stack spacing={3}>
          <Stack>
            <Paper sx={{ p: 3 }}>
              <Typography>4ステップで快適な鉄道へナビゲートします。</Typography>
            </Paper>
          </Stack>

          <Stack>
            <Divider>
              <Chip label='1' size='small' />
            </Divider>
          </Stack>

          <Stack>
            <Paper sx={{ p: 3 }}>
              <Stack sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' } }} spacing={3} direction={{ xs: 'column', md: 'row' }}>
                <Stack sx={{ width: { xs: '100%', md: '50%' } }}>
                  <Stack spacing={3}>
                    <Stack>
                      <Typography fontWeight={'bold'}>鉄道名は何ですか？</Typography>
                    </Stack>

                    <Stack>
                      <Autocomplete
                        sx={{ maxWidth: 300 }}
                        value={trainName}
                        options={trainNameOptions}
                        renderInput={(params) => (
                          <TextField
                            label='鉄道名'
                            helperText='例：東海道線'
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <TrainRounded />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                        onChange={handleTrainName}
                      />
                    </Stack>
                  </Stack>
                </Stack>

                <Stack sx={{ width: { xs: '100%', md: '50%' } }}>
                  <Box sx={{ p: 3, border: '1px dashed gray' }}>
                    <Stack spacing={3} alignItems={'center'}>
                      <Stack>
                        <img style={{ maxWidth: '100%' }} src={trainPreview} alt='Train preview' width='200' />
                      </Stack>

                      <Stack>
                        <Typography variant='caption' textAlign={'center'}>プレビュー</Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </Paper>
          </Stack>

          <Stack>
            <Divider>
              <Chip label='2' size='small' />
            </Divider>
          </Stack>

          <Stack>
            <Paper sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack>
                  <Typography fontWeight={'bold'}>発車駅と終点駅はどこですか？</Typography>
                </Stack>

                <Stack>
                  <Stack spacing={3}>
                    <Stack>
                      <Autocomplete
                        sx={{ maxWidth: 300 }}
                        options={stationNameOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='発車駅名'
                            helperText='例：辻堂'
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <LocationOnRounded />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Stack>

                    <Stack sx={{ maxWidth: 300 }} alignItems={'center'} justifyContent={'center'}>
                      <ArrowDownwardRounded />
                    </Stack>

                    <Stack>
                      <Autocomplete
                        sx={{ maxWidth: 300 }}
                        options={[]}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='終点駅名'
                            helperText='例：宇都宮'
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <FlagRounded />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          </Stack>

          <Stack>
            <Divider>
              <Chip label='3' size='small' />
            </Divider>
          </Stack>

          <Stack>
            <Paper sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack>
                  <Typography fontWeight={'bold'}>発車時刻はいつですか？</Typography>
                </Stack>

                <Stack>
                  <Autocomplete
                    sx={{ maxWidth: 300 }}
                    options={[]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='発車時刻'
                        helperText='例：13:00'
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position='start'>
                              <ScheduleRounded />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Stack>

                <Stack>
                  <Box sx={{ p: 3, border: '1px dashed gray' }}>
                    <Typography>ステップ2まで入力すると、発車時刻の一覧を表示できます。</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Paper>
          </Stack>

          <Stack>
            <Divider>
              <Chip label='4' size='small' />
            </Divider>
          </Stack>

          <Stack>
            <Paper sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack>
                  <Typography fontWeight={'bold'}>混雑度の可視化</Typography>
                </Stack>

                <Stack>
                  <Box sx={{ p: 3, border: '1px dashed gray' }}>
                    <Typography>ステップ3まで入力すると、混雑度を表示できます。</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
