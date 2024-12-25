import Foundation
import Yams

final class TrackingGen {
    private let inputFileUrl: URL
    private let outputFileUrl: URL

    init(inputFileUrl: URL, outputFileUrl: URL) {
        self.inputFileUrl = inputFileUrl
        self.outputFileUrl = outputFileUrl
    }

    func run() {
        do {
            let events = try getEventsFromFile()

            var trackingEventsOutput = ""

            events.forEach {
                trackingEventsOutput.append($0.asSwift)
                trackingEventsOutput.append("\n\n")
            }

            let output = """
struct InternalEvents {
\(trackingEventsOutput)
}
"""
            try saveOutputToFile(output)
        } catch {
            fatalError("Error \(error)")
        }
    }

    private func saveOutputToFile(_ output: String) throws {
        try output.write(to: outputFileUrl, atomically: true, encoding: .utf8)
    }

    private func getEventsFromFile() throws -> [Event] {
        let yamlContents = try readFile()
        
        guard let yaml = try Yams.load(yaml: yamlContents) as? [String: Any] else {
            fatalError("Invalid yaml")
        }
        
        return yaml.map { .init(name: $0, yaml: $1) }
    }

    private func readFile() throws -> String {
        try String(contentsOf: inputFileUrl, encoding: .utf8)
    }
}
