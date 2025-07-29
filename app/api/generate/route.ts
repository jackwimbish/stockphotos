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
  "but one person's laptop screen shows only a close-up of Nicolas Cage's face",
  "but the whiteboard has 'BEANS' written in huge letters",
  "but everyone is wearing one flip-flop and one high heel",
  "but there's a life-sized cardboard cutout of a horse in the background",
  "but all the office chairs are actually bean bags shaped like giant fruits",
  "but the motivational poster on the wall just says 'EXISTENCE IS PAIN'",
  "but one person is inexplicably holding a medieval sword",
  "but all the pens are actually tiny corndogs",
  "but there's a full-sized mannequin wearing a sombrero sitting at the table",
  "but everyone's name tags say 'HELLO MY NAME IS STEVE'",
  "but the ceiling fan has rubber chickens hanging from it instead of blades",
  "but everyone's briefcases are actually lunchboxes with cartoon characters",
  "but the water cooler is dispensing orange soda instead of water",
  "but there's a live flamingo standing in the corner wearing a tie",
  "but all the staplers have been replaced with tiny hammers",
  "but the conference table is actually a giant pizza",
  "but everyone's ties are made of lettuce leaves",
  "but there's a disco ball hanging where the projector should be",
  "but all the office supplies are made of cheese",
  "but one person is wearing a full knight's helmet",
  "but the filing cabinets are actually giant toasters",
  "but there's a life-sized statue of a penguin in business attire",
  "but all the computer monitors show only screensavers of flying toasters",
  "but the carpet pattern is actually tiny pictures of Danny DeVito",
  "but everyone's watches are actually tiny snow globes",
  "but there's a vending machine that only sells socks",
  "but all the door handles are shaped like bananas",
  "but there's a full drum kit set up in the background",
  "but all the picture frames contain photos of the same random cat",
  "but everyone's hair is inexplicably wet",
  "but the trash cans are actually fishbowls with goldfish",
  "but there's a live peacock perched on someone's shoulder",
  "but the ceiling is covered in artificial grass",
  "but there's a sandbox in the middle of the office",
  "but everyone's shirts have random food stains that spell out words",
  "but the windows show a view of the moon instead of outside",
  "but all the chairs have racing stripes",
  "but there's a full-sized replica of Stonehenge in the background",
  "but everyone's laptops are actually Etch-a-Sketches",
  "but the walls are covered in bubble wrap",
  "but there's a mariachi band playing quietly in the corner",
  "but all the light bulbs are shaped like ice cream cones",
  "but everyone's socks are visible and completely mismatched",
  "but there's a life-sized cardboard cutout of a giraffe wearing glasses",
  "but the copy machine is actually a cotton candy machine",
  "but there's a full Christmas tree decorated in the middle of summer",
  "but all the clocks show different times and some show impossible times",
  "but everyone's pants are clearly pajama bottoms",
  "but there's a hot air balloon visible through the window",
  "but the conference phone is actually a banana",
  "but everyone's name plates are written in crayon",
  "but there's a life-sized chess set being used as furniture",
  "but all the printers are printing nothing but smiley faces",
  "but everyone's ties are actually measuring tapes",
  "but there's a full carnival carousel in the background",
  "but the whiteboard markers are actually lipsticks",
  "but everyone's briefcases are held together with duct tape",
  "but there's a massive aquarium where the reception desk should be",
  "but all the ceiling tiles have been replaced with mirrors",
  "but everyone's business suits have superhero capes attached",
  "but there's a full-sized rocket ship model in the lobby",
  "but all the staplers are shaped like dinosaurs",
  "but everyone's hair is styled to look like different vegetables",
  "but there's a live owl sitting on every computer monitor",
  "but all the office phones are rotary phones from the 1950s",
  "but everyone's ID badges have photos of celebrities instead",
  "but there's a full miniature golf course running through the office",
  "but all the paper clips have been replaced with tiny spoons",
  "but everyone's shoes are actually house slippers shaped like animals",
  "but there's a giant hamster wheel being used as a meeting space",
  "but the motivational posters all feature pictures of sandwiches",
  "but there's a life-sized statue of a T-Rex wearing a business suit",
  "but all the desk lamps are actually periscopes",
  "but everyone's coffee mugs are tiny fishbowls with fish",
  "but there's a full-sized pirate ship in the parking lot visible through windows",
  "but all the elevator music is replaced with heavy metal",
  "but everyone's pens are actually magic wands",
  "but there's a live tiger sleeping under the conference table",
  "but all the Post-it notes have been replaced with actual sticky pancakes",
  "but everyone's dress shirts have cartoon character prints",
  "but there's a full operating carnival in the office courtyard",
  "but all the computer mice are actually tiny cars",
  "but everyone's notebooks are actually children's coloring books",
  "but there's a life-sized replica of the Eiffel Tower made of office supplies",
  "but all the desk chairs are actually exercise balls with wheels",
  "but there's a full-sized windmill spinning in the background",
  "but all the filing cabinets are shaped like different animals",
  "but there's a live dolphin in a tank being used as a coffee table",
  "but all the ceiling fans are actually spinning pizza wheels"
]

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const randomDetail = weirdDetails[Math.floor(Math.random() * weirdDetails.length)]
    const enhancedPrompt = `${prompt}, ${randomDetail}. Professional stock photo style, high quality, corporate lighting`

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
