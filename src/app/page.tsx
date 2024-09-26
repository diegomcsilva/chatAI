"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { generateContent } from "@/components/ui/chat-bot";
import { Input } from "@/components/ui/input";
import { SetStateAction, useState } from "react";

function suggestLink() {
  const link = 'https://seu_link_para_blusas';
  return `Você está procurando por blusas? Confira este link: ${link}`;
}

export default function Home() {
  const [input, setInput] = useState("");
  interface Content {
    role: string;
    parts: { text: string }[];
  }

  const [contents, setContents] = useState<Content[]>([]);

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInput(event.target.value);
  }

  function analyzeUserInput(contents: [], input: string) {
    // Expressão regular para verificar se a palavra "blusa" está presente
    const blusaRegex = /blusa/i; // 'i' para ignorar maiúsculas e minúsculas
  
    if (blusaRegex.test(input)) {
      // Se a palavra "blusa" foi encontrada, sugerir o link
      return suggestLink();
    } else {
      // Caso contrário, mostrar uma mensagem ou realizar outra ação
      return generateContent(contents, input)
    }
  }

  const handleFormSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    setContents(content => ([
      ...content,
      {
        role: 'user',
        parts: [
          {
            text: input
          }
        ]
      }
    ]));

    const result = await analyzeUserInput(contents as [], input);

    setContents(content => ([
      ...content,
      {
        role: 'model',
        parts: [
          {
            text: result as string
          }
        ]
      }
    ]));

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
            contents.map((content, index) => {
              return (
                <div key={index} className="flex gap-3 text-slate-600 text-small">
                  <Avatar>
                    <AvatarFallback>{content.role}</AvatarFallback>
                    <AvatarImage src={`h  ttps://github.com/${content.role === 'user' ? 'diegomcsilva' : 'devrayanco'}.png`} />
                  </Avatar>
                  <p className="leading-relaxed">
                    <span className="block font-bold text-slate-700">{content.role}:</span>
                    {content.parts.map(part => <span key={`content-${part.text}`}>{part.text}</span>)}
                  </p>
                </div>
              );
            })
          }
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
