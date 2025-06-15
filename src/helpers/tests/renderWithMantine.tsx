import { MantineProvider } from '@mantine/core';
import { render, RenderOptions } from '@testing-library/react';
import React from 'react';

const customRender = (
    ui: React.ReactElement,
    options?: RenderOptions
) =>
    render(ui, {
        wrapper: ({ children }) => (
            <MantineProvider>
                {children}
            </MantineProvider>
        ),
        ...options,
    });

export * from '@testing-library/react';
export { customRender as render };