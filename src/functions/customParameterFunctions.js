module.exports = {
    cropOutFace: async (value, _modifyAppState, groupIndex, group) => {
        // creates a promise. We want to request all the images before we get back with parameters.
        return new Promise(async res => {
            // inherits the state of the component
            let groupClone = Object.assign({}, group);
            // make a request for the JSON data
            let requestOptions = {
                method: `GET`,
                redirect: `follow`
            };
            let count = 0;

            await groupClone.images.map(async mapx => {
                return new Promise(async mapRes => {
                    await fetch(`${mapx.baseUrl}?fm=json&faces=1`, requestOptions)
                        .then(response => {
                            let result = response.text();
                            return result
                        }).then(result => {

                            result = JSON.parse(result);
                            if (result.Faces) {
                                // let's work with the first face
                                let face = result.Faces[0];
                                // get the query parameters, if any
                                let url = mapx.url;

                                if (group.groupOptions.imageOptions.parameterSet === true) {
                                    url = mapx.baseUrl + '?' + group.groupOptions.imageOptions.parameterSetValue;
                                };
                                
                                let [baseUrl, params] = url.split('?');
                                
                                let [originalWidth, originalHeight, originalFacePos, originalFaceWidth] = [result.PixelWidth, result.PixelHeight, face.bounds.x, face.bounds.width];
                                let [width, height, facePos, faceWidth] = [undefined, undefined, undefined, undefined];
                                if (params) {
                                    params = params.split('&');

                                    // get the size params of the image
                                    if (params.includes)
                                        params = params.filter(x => {
                                            let [key, value] = x.split('=');
                                            // get the rendered width and height of the image first
                                            if (key === ('w' || 'width')) {
                                                width = parseInt(value);
                                            } if (key === ('h' || 'height')) {
                                                height = value
                                            }

                                            console.log(x.indexOf('mark'))
                                            // now, remove any marks from the iamge
                                            return x.indexOf('mark') < 0
                                        }).join('&')
                                }
                                // if missing a width or height, calculate it from the original image
                                if (typeof (width) === 'undefined' && typeof (height === 'undefined')) {
                                    width = originalWidth;
                                    height = originalHeight;
                                } else {
                                    if (typeof (width) === 'undefined') {
                                        width = (height * originalWidth) / originalHeight
                                    } else if (typeof (height) === 'undefined') {
                                        height = (width * originalHeight) / originalWidth
                                    }
                                }
                                // calculate the new face dimensions
                                facePos = (width * originalFacePos) / originalWidth;
                                faceWidth = (width * originalFaceWidth) / originalWidth;
                                // create the values for centering the image
                                let horizontallyCentered = width / 2 - (facePos + faceWidth / 2);
                                // re-create the image as a mark
                                let image = encodeURIComponent(mapx.baseUrl)

                                mapx.customCodeParams = `mark=${image}&mark-x=${horizontallyCentered}&mark-w=1&mark-pad=0`;
                                if (params) {
                                    mapx.customCodeParams += '&' + params
                                }
                                mapx.customImage = `https://bryansandbox.imgix.net/_static/transparent_pixel.png`;
                            }
                            console.log('mapx is: ', mapx)
                            return mapRes(mapx);
                        })
                        .catch(error => {
                            console.log(`error`, error);
                            alert(error);
                            return error
                        });
                }).then(() => {
                    count += 1;
                    if (count === groupClone.images.length) {
                        console.log('groupClone is supposed to be: ', groupClone)
                        return res(groupClone)
                    }
                })
            });

            // modify the app state
            // return an array of image parameters to be applied
        }).then((groupClone) => {
            console.log('groupClone in the function is: ', groupClone)
            return groupClone
        })
    }
}