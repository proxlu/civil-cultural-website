import React, { ReactNode } from 'react'
import * as reactIs from 'react-is'

/**
 * @example
 * Layout(Page, MyLayout)
 * 
 * Layout(Page, MyLayout, {title: 'Title', ...})
 * 
 * Layout(() => (
 *  <MyLayout>
 *   <Page />
 *  </MyLayout>
 * ))
 * 
 * Layout(() => (
 *  <MyLayout title='Title'>
 *   <Page />
 *  </MyLayout>
 * ))
 */

export function Layout(
    Page: (...props: any) => JSX.Element,
    Layout?: (...props: any) => JSX.Element,
    propsLayout?: object
): () => JSX.Element {
    return () => (
        Layout ?
            (
                <Layout {...propsLayout}>
                    <Page />
                </Layout>
            ) :
            <Page />
    )

}