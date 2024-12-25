import Foundation

let inputFilePath = CommandLine.arguments[0]
let outputFilePath = CommandLine.arguments[1]
let inputFileUrl = URL(fileURLWithPath: inputFilePath)
let outputFileUrl = URL(fileURLWithPath: outputFilePath)
let trackingGen = TrackingGen.init(
    inputFileUrl: inputFileUrl,
    outputFileUrl: outputFileUrl
)

trackingGen.run()
