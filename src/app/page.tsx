"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { generateContent } from "@/components/ui/chat-bot";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [contents, setContents] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  }

  const handleFormSubmit = async (event) => {
    const newContents = contents;
    event.preventDefault();
    console.log(input);

    newContents.push({
      role: 'user',
      parts: [
        {
          text: input
        }
      ]
    });

    setContents(newContents);

    const result = await generateContent(newContents);

    newContents.push({
      role: 'model',
      parts: [
        {
          text: result?.candidates[0]?.content?.parts[0]?.text
        }
      ]
    });

    setInput("");
  }

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center">
      <Card className="w-[440px] h-[700px] grid grid-rows-[min-content_1fr_min-content]">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
          <CardDescription>Chat with your friends</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {
            contents.map(content => {
              return (
                <div key={content?.parts[0]?.text} className="flex gap-3 text-slate-600 text-small">
                  <Avatar>
                    <AvatarFallback>{content.role}</AvatarFallback>
                    <AvatarImage src={`h  ttps://github.com/${content.role === 'user' ? 'diegomcsilva' : 'devrayanco'}.png`} />
                  </Avatar>
                  <p className="leading-relaxed">
                    <span className="block font-bold text-slate-700">{content.role}:</span>
                    {content.parts.map(part => <p>{part.text}</p>)}
                  </p>
                </div>
              );
            })
          }
          {/* <div className="flex gap-3 text-slate-600 text-small">
            <Avatar>
              <AvatarFallback>Chat</AvatarFallback>
              <AvatarImage src="https://github.com/diegomcsilva.png" />
            </Avatar>
            <p className="leading-relaxed">
              <span className="block font-bold text-slate-700">Humano:</span>
              {prompt.map(item => <p>{item}</p>)}
            </p>
          </div>
          <div className="flex gap-3 text-slate-600 text-small">
            <Avatar>
              <AvatarFallback>Chat</AvatarFallback>
              <AvatarImage src="https://github.com/devrayanco.png" />
            </Avatar>
            <p className="leading-relaxed">
              <span className="block font-bold text-slate-700">Humano:</span>
              {response.map(item2 => <p>{item2}</p>)}
            </p>
          </div> */}
        </CardContent>
        <CardFooter className="space-x-2">
          <Input placeholder="Como posso ajudar você" value={input}
            onChange={handleInputChange} />
          <Button type="submit"
            onClick={handleFormSubmit}
          >Enviar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
