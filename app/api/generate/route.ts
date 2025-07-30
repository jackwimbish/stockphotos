import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const weirdDetails = [
  "but one person is holding a single, sad-looking hot dog",
  "but all the plants in the background are actually tiny broccoli trees",
  "but everyone's coffee cups are actually miniature toilets",
  "but there's a rubber duck sitting prominently on the conference table",
  "but the whiteboard has 'BEANS' written in huge letters",
  "but there's a life-sized cardboard cutout of a horse in the background",
  "but all the office chairs are actually bean bags shaped like giant fruits",
  "but the motivational poster on the wall just says 'EXISTENCE IS PAIN'",
  "but one person is inexplicably holding a medieval sword",
  "but all the pens are actually tiny corndogs",
  "but there's a full-sized mannequin wearing a sombrero sitting at the table",
  "but everyone's name tags say 'HELLO MY NAME IS STEVE'",
  "but the ceiling fan has rubber chickens hanging from it instead of blades",
  "but there's a live flamingo standing in the corner wearing a tie",
  "but the conference table is actually a giant pizza",
  "but everyone's ties are made of lettuce leaves",
  "but there's a disco ball hanging where the projector should be",
  "but all the office supplies are made of cheese",
  "but one person is wearing a full knight's helmet",
  "but the filing cabinets are actually giant toasters",
  "but there's a life-sized statue of a penguin in business attire",
  "but there's a live peacock perched on someone's shoulder",
  "but everyone's shirts have random food stains that spell out words",
  "but there's a full-sized replica of Stonehenge in the background",
  "but there's a mariachi band playing quietly in the corner",
  "but there's a life-sized cardboard cutout of a giraffe wearing glasses",
  "but everyone's ties are actually measuring tapes",
  "but everyone's hair is styled to look like different vegetables",
  "but there's a live owl sitting on every computer monitor",
  "but all the paper clips have been replaced with tiny spoons",
  "but there's a giant hamster wheel being used as a meeting space",
  "but there's a life-sized statue of a T-Rex wearing a business suit",
  "but all the desk lamps are actually periscopes",
  "but everyone's coffee mugs are tiny fishbowls with fish",
  "but there's a full-sized pirate ship in the parking lot visible through windows",
  "but everyone's dress shirts have cartoon character prints",
  "but there's a full operating carnival in the office courtyard",
  "but it's in the style of Monty Python"
]

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const randomDetail = weirdDetails[Math.floor(Math.random() * weirdDetails.length)]
    const enhancedPrompt = `${prompt}, ${randomDetail}. Professional stock photo style, high quality, corporate lighting, photorealistic faces, clear facial features, professional headshots quality`

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    })

    const imageUrl = response.data?.[0]?.url
    if (!imageUrl) {
      throw new Error('No image generated')
    }

    return NextResponse.json({ 
      imageUrl,
      weirdDetail: randomDetail.replace('but ', ''),
      originalPrompt: prompt 
    })
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' }, 
      { status: 500 }
    )
  }
}
