import React from 'react'
import {LevelList, Heading, Title, Content} from "./LevelList"

function Main(){
    return (
        <div className="m-4">
            <LevelList>
                <Heading>
                    <Title text="Định nghĩa"/>

                </Heading>
                <Heading>
                    <Title text="Các loại danh từ"/>
                    <Content>Danh từ được phân thành hai loại chính: danh từ cụ thể và danh từ trừu tượng</Content>

                    <Heading>
                        <Title text="Danh từ cụ thể và danh từ trừu tượng"/>
                        <Heading>
                            <Title text="Danh từ cụ thể"/>

                            <Content>
                                <div>Danh từ cụ thể là</div>
                                <div>Danh từ cụ thể được chia</div>
                            </Content>

                            <Heading>
                                <Title text="Danh từ chung"/>
                            </Heading>

                            <Heading>
                                <Title text="Danh từ riêng"/>
                            </Heading>
                        </Heading>
                        <Heading><Title text="Danh từ trừu tượng"/></Heading>
                    </Heading>

                    <Heading>
                        <Title text="Danh từ đếm được và danh từ không đếm được"/>
                        <Heading><Title text="Danh từ đếm được"/></Heading>
                        <Heading><Title text="Danh từ không đếm được"/></Heading>
                    </Heading>

                    <Heading>
                        <Title text="Danh từ đơn và danh từ kép"/>
                        <Heading><Title text="Danh từ đơn"/></Heading>
                        <Heading><Title text="Danh từ kép"/></Heading>
                    </Heading>

                    <Heading>
                        <Title text="Danh từ số nhiều và danh từ số ít"/>
                    </Heading>
                </Heading>
                <Heading>
                    <Title text="Chức năng của danh từ"/>
                    <Heading><Title text="Chủ ngữ của câu"/></Heading>
                    <Heading><Title text="Tân ngữ trực tiếp hoặc gián tiếp của câu"/></Heading>
                    <Heading><Title text="Tân ngữ của giới từ"/></Heading>
                    <Heading><Title text="Bổ ngữ của chủ ngữ"/></Heading>
                    <Heading><Title text="Bổ ngữ của tân ngữ"/></Heading>
                    <Heading><Title text="Một phần của ngữ giới"/></Heading>
                    <Heading><Title text="Đồng vị ngữ với một danh từ khác"/></Heading>
                </Heading>
                <Heading>
                    <Title text="Sự tương phản giữa chủ ngữ và động từ"/>
                    <Heading><Title text="Sự tương phản giữa chủ ngữ và động từ"/></Heading>
                    <Heading><Title text="Động từ số ít"/></Heading>
                    <Heading><Title text="Động từ số nhiều"/></Heading>
                    <Heading><Title text="Động từ số ít hay số nhiều?"/></Heading>
                </Heading>

                <Heading><Title text="Sở hữu cách"/></Heading>
            </LevelList>

        </div>
    )
}

export default Main
