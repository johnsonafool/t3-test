"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormGroup } from "@/components/form-group";
import { api } from "@/lib/trpc/api/client";

const colors = [
  "blue",
  "red",
  "pink",
  "green",
  "orange",
  "yellow",
  "white",
  "black",
];

const shapes = ["square", "circle", "rounded"];

const styles = [
  "claymorphic",
  "3d rendered",
  "pixelated",
  "illustrated with color pencil",
];

export default function Page() {
  const [form, setForm] = useState({
    prompt: "",
    color: "",
    shape: "",
    style: "",
    numberOfIcons: "1",
  });
  const [error, setError] = useState("");
  const [imagesUrl, setImagesUrl] = useState<{ imageUrl: string }[]>([]);

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      setImagesUrl(data);
    },
    onError(error) {
      setError(error.message);
    },
  });

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    generateIcon.mutate({
      ...form,
      numberOfIcons: parseInt(form.numberOfIcons),
    });
  }

  function updateForm(key: string) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-6xl">Generate your icons</h1>
      <p className="mb-12 text-2xl">
        Fill out the form below to start generating your icons.
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <h2 className="text-xl">
          1. Describe what your want your icon to look like.
        </h2>
        <FormGroup className="mb-12">
          <label>Prompt</label>
          <Input
            required
            value={form.prompt}
            onChange={updateForm("prompt")}
          ></Input>
        </FormGroup>

        <h2 className="text-xl">2. Pick your icon color.</h2>
        <FormGroup className="mb-12 grid grid-cols-4">
          {colors.map((color) => (
            <label key={color} className="flex gap-2 text-2xl">
              <input
                required
                type="radio"
                name="color"
                checked={color === form.color}
                onChange={() => setForm((prev) => ({ ...prev, color }))}
              ></input>
              {color}
            </label>
          ))}
        </FormGroup>

        <h2 className="text-xl">3. Pick your icon shape.</h2>
        <FormGroup className="mb-12 grid grid-cols-4">
          {shapes.map((shape) => (
            <label key={shape} className="flex gap-2 text-2xl">
              <input
                required
                type="radio"
                name="shape"
                checked={shape === form.shape}
                onChange={() => setForm((prev) => ({ ...prev, shape }))}
              ></input>
              {shape}
            </label>
          ))}
        </FormGroup>

        <h2 className="text-xl">4. Pick your icon style.</h2>
        <FormGroup className="mb-12 grid grid-cols-4">
          {styles.map((style) => (
            <label key={style} className="flex gap-2 text-2xl">
              <input
                required
                type="radio"
                name="style"
                checked={style === form.style}
                onChange={() => setForm((prev) => ({ ...prev, style }))}
              ></input>
              {style}
            </label>
          ))}
        </FormGroup>

        <h2 className="text-xl">5. How many do you want.</h2>
        <FormGroup className="mb-12">
          <label>Number of icons</label>
          <Input
            inputMode="numeric"
            pattern="[1-9]|10"
            value={form.numberOfIcons}
            required
            onChange={updateForm("numberOfIcons")}
          ></Input>
        </FormGroup>

        {error && (
          <div className="rounded bg-red-500 p-8 text-xl text-white">
            {error}
          </div>
        )}

        <Button
          // isLoading={generateIcon.isLoading}
          disabled={generateIcon.isLoading}
        >
          Submit
        </Button>
      </form>

      {imagesUrl.length > 0 && (
        <>
          <h2 className="text-xl">Your Icons</h2>
          <section className="mb-12 grid grid-cols-4 gap-4">
            {imagesUrl.map(({ imageUrl }) => (
              <Image
                key={imageUrl}
                src={imageUrl}
                alt="an image of your generated prompt"
                width="512"
                height="512"
                className="w-full"
              />
            ))}
          </section>
        </>
      )}
    </div>
  );
}
