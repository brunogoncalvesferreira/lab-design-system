import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { Signin } from "./Signin";
import { rest } from 'msw'

export default {
  title: "pages/Signin",
  component: Signin,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post('/sessions', (req, res, ctx) => {
          return res(ctx.json({
            messege: 'Login realizado!'
          }))
        })
      ]
    }
  }
} as Meta;

export const Default: StoryObj = {
  play: async( { canvasElement } ) => {
      const canvas = within(canvasElement)

      userEvent.type(canvas.getByPlaceholderText('Digite seu e-mail'), 'brunogoncalvesferreira@outlook.com')
      userEvent.type(canvas.getByPlaceholderText('************'), '12345678')

      userEvent.click(canvas.getByRole('button'))

      await waitFor(()=>{
        return expect(canvas.getByText('Login realizado!')).toBeInTheDocument()
      })

  }
};
